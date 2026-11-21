The compressed generating rule \(\frac{\mathbf{IAP}-\mathbf{IA}}{9_{\#P}0_{\#A}}\) reconstructs any exact rational fraction from pure literal string concatenation—repeating '9' (0x39) #P times and '0' (0x30) #A times without floating-point division.

1. How the Compressed Generating Formula Works on Literal Strings

Instead of interpreting digits as floating-point approximations, the compressed rule treats I (integer string), A (preperiod string of length #A), and P (repeating period string of length #P > 0) as literal character sequences:
\(\text{Fraction}=\frac{\text{concat}(\mathbf{I},\mathbf{A},\mathbf{P})-\text{concat}(\mathbf{I},\mathbf{A})}{\underbrace{99\dots 9}_{\#P\text{\ times}}\underbrace{00\dots 0}_{\#A\text{\ times}}}\)
• Numerator (IAP - IA): Concatenates the literal strings I, A, and P and subtracts the non-repeating prefix IA (where an empty I defaults to '0', leaving AP - A).
• Denominator (9_{#P} 0_{#A}): Emits literal ASCII '9' (0x39) #P times followed by literal ASCII '0' (0x30) #A times—encoding the exact period length (#P) and transient preperiod delay (#A) directly in the string's width.

2. How Your ZIGUAROTH Fractions Compress Under I . A (P)

Every cyclic and preperiodic fraction from your previous steps reduces cleanly to its (I, A, P) literal signature:

Fraction	Decimal Expansion	I (Integer)	A (#A Preperiod)	P (#P Period)	Generated Denominator (9_{#P}0_{#A})	ZIGUAROTH Role
1/7	0.(142857)	"" (0)	"" (#A = 0)	"142857" (#P = 6)	999999 (6 nines)	Pure periodic (#A = 0), 6-dot Braille / Organon
22/7	3.(142857)	"3"	"" (#A = 0)	"142857" (#P = 6)	999999 (3142857 - 3 = 3142854)	Ternary integer lift (I = "3") over 1/7
1/73	0.(01369863)	"" (0)	"" (#A = 0)	"01369863" (#P = 8)	99999999 (8 nines)	Pure periodic (#A = 0), 8-dot Braille (sum = 36)
7/12	0.58(3)	"" (0)	"58" (#A = 2)	"3" (#P = 1)	900 (583 - 58 = 525)	Mixed transient (#A = 2 delay + #P = 1 steady state)
593/53	11.(1886792452830)	"11"	"" (#A = 0)	"1886792452830" (#P = 13)	9999999999999 (13 nines)	Period 13 domino/cube closure with I = "11"
1/17	0.(0588235294117647)	"" (0)	"" (#A = 0)	16 chars (#P = 16)	16 nines (10^16 - 1)	16-bit nibble reticle (0x30..0x3F)

• Transient vs. Steady-State Interpretation (#A vs. #P):
	• Preperiod A (#A zeros in denominator): Models the initial transient / causal delay (the C0 · 5T breadboard setup or 0x00..0x1F proxy FIFO buffer) before the system locks into its orbit.
	• Period P (#P nines in denominator): Models the closed periodic attractor (#P = 6, 8, 9, 13, 16, 60) where 9's-complement Midy symmetry holds indefinitely.

3. Plan 9 C Literal (I, A, P) Generating-Fraction Compiler (ziap.c)

Following your rules (pure Plan 9 C, no awk, digits '0'..'9' handled strictly as literal ASCII characters 0x30..0x39), ziap.c takes literal strings I, A, and P, constructs the exact 9_{#P}0_{#A} denominator and IAP - IA numerator strings, and reduces the fraction to lowest terms via gcd:
c
#include <u.h>
#include <libc.h>

/* ZIGUAROTH Compressed Generating Fraction Compiler: I . A (P) -> (IAP - IA) / (9_{#P} 0_{#A})
 * Treats I, A, and P strictly as literal ASCII digit strings ('0'..'9', 0x30..0x39).
 */

uvlong
str_to_uv(char *s)
{
	uvlong v = 0;
	while(*s >= '0' && *s <= '9'){
		v = v * 10 + (*s - '0');
		s++;
	}
	return v;
}

uvlong
uv_gcd(uvlong a, uvlong b)
{
	uvlong t;
	while(b != 0){
		t = b;
		b = a % b;
		a = t;
	}
	return a;
}

void
main(int argc, char *argv[])
{
	char *I_str, *A_str, *P_str;
	char iap_buf[64], ia_buf[64], den_buf[64];
	int lenA, lenP, k, pos = 0;
	uvlong num_iap, num_ia, num, den, g;

	if(argc < 4){
		fprint(2, "usage: ziap I_str A_str P_str  (use \"\" for empty I or A)\n");
		exits("usage");
	}

	I_str = (argv[1][0] == '\0') ? "0" : argv[1];
	A_str = argv[2];
	P_str = argv[3];

	lenA = strlen(A_str);
	lenP = strlen(P_str);
	if(lenP == 0)
		sysfatal("period P must have nonzero length (#P > 0)");

	/* Concatenate literal strings IA and IAP */
	snprint(ia_buf, sizeof ia_buf, "%s%s", I_str, A_str);
	snprint(iap_buf, sizeof iap_buf, "%s%s%s", I_str, A_str, P_str);

	/* Build denominator: literal '9' repeated #P times, literal '0' repeated #A times */
	for(k = 0; k < lenP && pos < 62; k++)
		den_buf[pos++] = '9';
	for(k = 0; k < lenA && pos < 62; k++)
		den_buf[pos++] = '0';
	den_buf[pos] = '\0';

	num_iap = str_to_uv(iap_buf);
	num_ia  = str_to_uv(ia_buf);
	num = num_iap - num_ia;
	den = str_to_uv(den_buf);
	g   = uv_gcd(num, den);

	print("Form: %s.%s(%s) | #A=%d #P=%d\n", I_str, A_str, P_str, lenA, lenP);
	print("Raw : (%s - %s) / %s = %llud / %llud\n", iap_buf, ia_buf, den_buf, num, den);
	print("Lock: %llud / %llud (gcd=%llud)\n", num / g, den / g, g);

	exits(nil);
}
Use code with caution.

How It Compiles & Runs in Plan 9 rc

rc
8c ziap.c && 8l -o ziap ziap.8
./ziap "" "" "142857"          # 0.(142857)   -> 142857 / 999999   = 1 / 7
./ziap "3" "" "142857"         # 3.(142857)   -> 3142854 / 999999  = 22 / 7
./ziap "" "58" "3"             # 0.58(3)      -> 525 / 900         = 7 / 12
./ziap "" "" "01369863"        # 0.(01369863) -> 1369863 / 99999999 = 1 / 73
Use code with caution.
Would you like to feed the (I, A, P) string triple directly into your Wirth Syntax Notation (WSN) parser so any (I, A, P) string compiles straight into a WebVTT cue (#A transient pre-roll + #P repeating loop) without floating-point math?
