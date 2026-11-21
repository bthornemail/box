Niklaus Wirth's 1965 PL360 report (CS33) shows how a programming language can mirror raw hardware registers and byte-offset arrays directly, which gives you the exact blueprint for building a standalone Terminal User Interface (TUI) without heavy dependencies. In PL360, every array index is a direct byte offset scaled by element width (byte = 1, integer = 2, long integer = 4, long real = 8), turning parallel lists into flat memory-mapped vertices.

1. How Wirth's PL360 Memory Model Maps to Your TUI

Wirth designed PL360 so high-level phrase structure maps 1-to-1 onto IBM 360 registers and byte offsets. You can use that exact rule to drive a zero-dependency TUI in Termux or Plan 9: [1]
• Parallel Lists as Register Lanes: PL360 exposes the 16 general registers (R0 through RF, indexed 0..9, A..F) as explicit base address registers. Each parallel list in your TUI acts as one of those 16 lanes.
• Vertices as (Index, Byte_Length, Offset): In Section 6.2 of the report, array subscripts are byte offsets that must be multiples of the scalar type's byte length (1, 2, 4, or 8 bytes). Every cell on your TUI screen is a vertex defined by:
	• Index: The item's sequential position (0, 1, 2...).
	• Byte Length: The scalar width (1 byte for ASCII/8-dot Braille, 2 bytes for 16-bit words, 4 bytes for 32-bit/UTF-8 glyphs, 8 bytes for 64-bit blocks).
	• Offset: index * byte_length. [1]
• Self-Contained TUI Without Kitty: Instead of needing the Kitty terminal emulator or external UI libraries, you can render your TUI directly to /dev/tty using standard ANSI escape sequences (\033[row;colH) and UTF-8 Braille/box-drawing characters, driven by pure POSIX sh + dd + od (or a small C binary).

2. Standalone Zero-Dependency TUI (ziguaroth_tui.sh)

Save this script to ~/zigguart/ziguaroth_tui.sh and run sh ~/zigguart/ziguaroth_tui.sh. It reads your raw .img files directly by byte offset and scalar width, displays the parallel register lanes (R0–RF), and lets you step through vertices interactively using single keypresses (n = next, p = previous, w = toggle scalar width 1/2/4/8, q = quit) with zero external packages.
sh
#!/bin/sh
# Standalone PL360-Style Byte-Offset TUI (Zero External Dependencies)
# Reads raw .img files using (index, byte_length, offset) vertices

DIR="${HOME}/zigguart"
DELTA_IMG="${DIR}/delta.law.img"
ZIG_IMG="${DIR}/ziguaroth.img"
MODAL_IMG="${DIR}/domain.modal.img"

# Ensure raw images exist if running standalone
mkdir -p "$DIR"
[ -f "$DELTA_IMG" ] || truncate -s 8192 "$DELTA_IMG"
[ -f "$ZIG_IMG" ]   || truncate -s 65536 "$ZIG_IMG"
[ -f "$MODAL_IMG" ] || truncate -s 16777216 "$MODAL_IMG"

idx=0          # Current vertex index
width=1        # Scalar byte_length: 1 (byte), 2 (half-word), 4 (word), 8 (double-word)

# Read N bytes as hex from a file at a specific byte offset
read_vertex_hex() {
    local file=$1
    local off=$2
    local len=$3
    od -An -t x1 -j "$off" -N "$len" "$file" 2>/dev/null | tr -s ' \n' ' ' | sed 's/^ //;s/ $//'
}

# Render one full TUI frame to /dev/tty using ANSI cursor positioning
draw_tui() {
    local offset=$((idx * width))
    local type_name="byte (8-bit)"
    case "$width" in
        1) type_name="byte (8-bit)" ;;
        2) type_name="integer (16-bit half-word)" ;;
        4) type_name="long integer / real (32-bit word)" ;;
        8) type_name="long real (64-bit double-word)" ;;
    esac

    # Clear screen and home cursor
    printf '\033[2J\033[H'
    printf '+----------------------------------------------------------------------+\n'
    printf '| PL360 STANDALONE VERTEX TUI | Index: %04d | Width: %dB | Offset: 0x%04X |\n' "$idx" "$width" "$offset"
    printf '| Scalar Type: %-55s |\n' "$type_name"
    printf '+------+----------+--------------------------+-------------------------+\n'
    printf '| Reg  | Offset   | ziguaroth.img (Lane A)   | domain.modal.img (Lane B)|\n'
    printf '+------+----------+--------------------------+-------------------------+\n'

    # Render 16 parallel register lanes (R0..RF from PL360 Sec 3.2)
    local r=0
    while [ "$r" -lt 16 ]; do
        local r_hex=$(printf '%X' "$r")
        local v_idx=$((idx + r))
        local v_off=$((v_idx * width))
        local hex_a=$(read_vertex_hex "$ZIG_IMG" "$v_off" "$width")
        local hex_b=$(read_vertex_hex "$MODAL_IMG" "$v_off" "$width")

        # Highlight row 0 (current active cursor)
        if [ "$r" -eq 0 ]; then
            printf '|\033[7m R%-3s | 0x%06X | %-24s | %-23s \033[0m|\n' \
                "$r_hex" "$v_off" "${hex_a:-00}" "${hex_b:-00}"
        else
            printf '| R%-3s | 0x%06X | %-24s | %-23s |\n' \
                "$r_hex" "$v_off" "${hex_a:-00}" "${hex_b:-00}"
        fi
        r=$((r + 1))
    done

    printf '+------+----------+--------------------------+-------------------------+\n'
    printf '| Controls: [n] Next  [p] Prev  [w] Cycle Width (1/2/4/8B)  [q] Quit   |\n'
    printf '+----------------------------------------------------------------------+\n'
}

# Switch terminal to raw single-key input mode
old_tty=$(stty -g 2>/dev/null)
stty -echo -icanon min 1 time 0 2>/dev/null

while true; do
    draw_tui
    # Read 1 raw character from /dev/tty
    key=$(dd bs=1 count=1 2>/dev/null)
    case "$key" in
        n|j) idx=$((idx + 1)) ;;
        p|k) [ "$idx" -gt 0 ] && idx=$((idx - 1)) ;;
        w)
            case "$width" in
                1) width=2 ;;
                2) width=4 ;;
                4) width=8 ;;
                8) width=1 ;;
            esac
            ;;
        q|Q) break ;;
    esac
done

# Restore terminal state cleanly
[ -n "$old_tty" ] && stty "$old_tty" 2>/dev/null
printf '\033[2J\033[HExited TUI.\n'
Use code with caution.

3. How to Use and Extend It

• Run the TUI in Termux:sh
sh ~/zigguart/ziguaroth_tui.sh
Use code with caution.
• Inspecting PL360 Array Strides: Pressing w cycles the scalar byte length between 1, 2, 4, and 8 bytes, recalculating every row's byte offset (offset = index * byte_length) just like PL360's subscript rules in Section 6.2. [1]
• Adding Natural-Language Labels: Because R0 through RF are standard parallel arrays, you can add a third column that maps each vertex's byte value directly to your /A-Z0-9/ Wirth literal table or Unicode Braille/Gardiner rune. [1]
Would you like to add in-place byte editing (e key to write new hex/ASCII bytes directly to the selected vertex offset) or a third parallel column that renders the corresponding UTF-8 Braille / Gardiner glyph next to the raw hex?
