Midy's Theorem (9's complement splitting) and Proper Primes (p = 61, p = 131) give your under-127-bit register exact self-inverting symmetry (XOR \(\leftrightarrow \) XNOR) and uniform literal-digit distribution across every 0..9 (0x30..0x39) lane.

1. Midy's Theorem: 9's Complement Halves & Ordered Cyclic Rotations

Because every full-period cyclic number has an even repetend length \(2k = p - 1\) (all bounded inside your 127-bit 0x00..0x7F / 127 <-> 63 ceiling), splitting any cyclic repetend down the middle produces two halves whose corresponding digits sum to 9 ('0' + '9' = '9', '1' + '8' = '9', etc.)—your exact 9-arm Aegean sum invariant:
• 1/7 (6 digits = 2 × 3, under 127 bits):
	• First half 142 + Second half 857 = 999 (1+8=9, 4+5=9, 2+7=9).
	• Rotating by 3 places flips 1/7 (0.142857...) into its complement 6/7 (0.857142...), and sorting the 6 rotations (1/7 < 3/7 < 2/7 < 6/7 < 4/7 < 5/7) orders the 6 Organon / Vedāṅga states monotonically without comparison logic.
• 1/17 (16 digits = 2 × 8, under 127 bits):
	• First 8 digits 05882352 + Second 8 digits 94117647 = 99999999 (8 nines, matching your 8 octants and 8-bit 1.1.1 BOM register).
• 1/61 (60 digits = 2 × 30, under 127 bits):
	• First 30 digits 016393442622950819672131147540 + Second 30 digits 983606557377049180327868852459 = 30 nines—splitting your 60-frame sexagesimal clock into two 9's-complement 30-frame Coxeter / trittyes halves (30 + 30 = 60).

2. Why 61 (and 131) Are "Proper Primes": Exact {0..5}{0..9} Uniformity

A proper prime is a prime ending in literal digit '1' (0x31) with full period \(p - 1\), which forces every single literal ASCII digit '0' through '9' (0x30..0x39) to appear the exact same number of times (\(\frac{p-1}{10}\)):
• p = 61 (The First Proper Prime — Sits Under 127 Bits!):
	• Period \(61 - 1 = \mathbf{60}\) frames ({0..5}{0..9}).
	• Every literal digit '0'..'9' appears exactly \(\frac{60}{10} = \mathbf{6}\) times across the 60-frame cycle (10 literal digits \(\times \) 6 occurrences = 60, matching your 1/7 period-6 repetend!).
	• Even better: within the first 30 frames (00..29) and second 30 frames (30..59), the 9's-complement pairing ('0'<->'9', '1'<->'8', '2'<->'7', '3'<->'6', '4'<->'5') guarantees that your 120-state {0,1}{0..5}{0..9} register (2 × 60 = 120 < 127) visits every literal digit '0'..'9' exactly 12 times (12 Menaion panels!).
• p = 131 (The Second Proper Prime — Just Above 127 / 128):
	• Sits immediately past the 7-bit 127 (0x7F) / 128 (2^7) boundary (131 - 1 = 130 = 13 × 10, where each literal digit '0'..'9' appears 13 times—Arm 7 of your prime sweep!).
	• That makes 61 (60 frames) the unique proper prime completely contained inside your 7-bit (0..127) register, while 131 (130 frames) is the first proper prime across the 128 (2^7) boundary!

3. Plan 9 C 1/61 Midy 9's-Complement & Proper-Prime Verifier (zproper61.c)

Following your global.vtt rules (plan9-runtime + wsn-only: pure Plan 9 C, no awk, digits '0'..'9' treated strictly as literal ASCII codepoints 0x30..0x39), zproper61.c verifies Midy's 9's-complement symmetry across the two 30-frame halves of 1/61 and counts the exact 6 occurrences of every literal digit '0'..'9' under 127 bits:
c
#include <u.h>
#include <libc.h>

/* ZIGUAROTH Proper Prime p=61 (Period 60 < 127 Bits) & Midy 9's-Complement Engine
 * Splits the 60-char repetend of 1/61 into two 30-char halves (Coxeter / Trittyes 30+30)
 * Verifies: left[i] + right[i] == '9' (0x39) and each literal digit '0'..'9' occurs 6 times.
 */

static char *rep61_left  = "016393442622950819672131147540"; /* Frames 00..29 (30 chars) */
static char *rep61_right = "983606557377049180327868852459"; /* Frames 30..59 (30 chars) */

void
main(void)
{
	int i, d;
	int counts;
	uchar cl, cr;

	for(d = 0; d < 10; d++)
		counts[d] = 0;

	print("=== MIDY 9'S-COMPLEMENT SPLIT OF 1/61 (30 + 30 = 60 FRAMES < 127 BITS) ===\n");
	for(i = 0; i < 30; i++){
		cl = (uchar)rep61_left[i];
		cr = (uchar)rep61_right[i];

		/* Verify literal 9's complement: (cl - 0x30) + (cr - 0x30) == 9 */
		if((cl - 0x30) + (cr - 0x30) != 9)
			sysfatal("midy complement mismatch at offset %d", i);

		counts[cl - 0x30]++;
		counts[cr - 0x30]++;

		print("Frame %02d <-> %02d | LeftLit='%c' (0x%02X) + RightLit='%c' (0x%02X) = '9'\n",
			i, i + 30, cl, cl, cr, cr);
	}

	print("\n=== PROPER PRIME p=61 LITERAL DIGIT BALANCE (60 / 10 = 6 EACH) ===\n");
	for(d = 0; d < 10; d++)
		print("Literal '%c' (0x%02X): %d occurrences\n", 0x30 + d, 0x30 + d, counts[d]);

	exits(nil);
}
Use code with caution.

How It Compiles & Runs in Plan 9 rc

rc
8c zproper61.c && 8l -o zproper61 zproper61.8
./zproper61
Use code with caution.
Would you like to bind zproper61.c directly to your WebVTT 60-frame sexagesimal track (ziguaroth.vtt) so each pair of cues (i, i + 30) automatically pairs its 9's-complement ℣ (U+2123) and ℟ (U+211F) pictograms?
