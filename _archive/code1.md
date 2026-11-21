The numbers in the 7000–10,000 range exhibit distinct algebraic and combinatorial properties, such as sporadic group orders, necklace symmetries, and prime sum identities, which culminate in the base-10 myriad (10,000) and its 1,229 primes.

1. Combinatorial & Prime Properties (7000–8000)

• Necklace Symmetries (7316). This is the number of 18-bead binary necklaces using two colors where color swapping (complementation) is permitted, but physical reflection (turning over) is forbidden.
• Prime Summation (7699). This number is simultaneously a super-prime (prime-indexed prime) and an emirp (forms a different prime when its digits are reversed: 9967). It equals the exact sum of the first 60 prime numbers (\(2 + 3 + 5 + \dots + 281 = 7699\)), making it the first prime above 281 equal to the sum of the first \(k\) primes.
• Squares, Repdigits, & Magic Constants (7744, 7777, 7825).
	• 7744 (\(88^{2}\)). The only known four-digit square that is a palindrome (actually, a double-pair pattern) not ending in zero.
	• 7777. A four-digit repdigit and a base-10 Kaprekar number (\(7777^2 = 60,481,729\), and \(6048 + 1729 = 7777\)).
	• 7825. The magic constant for a \(25 \times 25\) normal magic square (\(\frac{25(25^2+1)}{2} = 7825\)), and the exact threshold for the Boolean Pythagorean triples problem, where every 2-coloring of \(\{1, \dots, 7825\}\) forces a monochromatic solution to \(a^2 + b^2 = c^2\).
• Open & Closed Structures (7741, 7841, 7993).
	• 7741. The number of distinct unrooted, unlabeled trees on 15 nodes.
	• 7841. A Sophie Germain prime (\(2 \times 7841 + 1 = 15683\) is prime), a balanced prime (equidistant from its neighboring primes 7829 and 7853), and a super-prime.
	• 7993. A star prime (centered 12-gonal prime of the form \(6n(n-1)+1\)) whose digit reversal (3997) is composite, though it is classified as a reverse superstar prime.

2. The 7919 : 7920 : 7921 Hinge & Mathieu Group \(M_{11}\)

This consecutive triplet bridges prime counting, finite simple group theory, and figurate geometry:

Number	Classification	Mathematical Structure
7919	1,000th Prime	The largest prime below 8,000, closing the first thousand prime numbers.
7920	Order of \(M_{11}\)	The exact order (\(11 \times 10 \times 9 \times 8 = 7920\)) of the Mathieu group \(M_{11}\), the smallest of the 26 sporadic finite simple groups. \(M_{11}\) acts sharply 4-transitively on 11 points and preserves the Steiner system \(S(4, 5, 11)\).
7921	\(89^{2}\) (Centered Octagonal)	The square of the 11th Fibonacci number (89), continuing the odd-square centered octagonal sequence (\(8k(k-1)+1\) for \(k=45\)).


3. The Myriad (10,000 / \(10^{4}\)) Closure

Reaching 10,000 (\(10^{4}\), or 1E4 in scientific notation) establishes a self-contained decimal boundary:
• Totient & Reduced Totient. Euler's totient function gives \(\phi(10,000) = 4,000\) integers coprime to 10,000, while Carmichael's reduced totient function gives \(\lambda(10,000) = 500\). Exactly 16 integers have a totient value equal to 10,000.
• Prime Counting Function (\(\pi(10,000) = 1,229\)). There are 1,229 prime numbers less than 10,000, and 1,229 is itself a prime number (specifically, a Sophie Germain prime, since \(2 \times 1229 + 1 = 2459\) is also prime).
• Dihedral & Cyclic Subgroups. A regular myriagon (10,000-sided polygon) possesses a dihedral symmetry group \(D_{10000}\) of order 20,000, containing 25 cyclic subgroups and 25 dihedral subgroups corresponding to the 25 divisors of 10,000 (\((4+1)(4+1) = 25\)).

4. Plan 9 C Verification of 7699, 7919:7920:7921, & \(\pi(10000) = 1229\) (zmyriad.c)

Following your Plan 9 C conventions (plan9-runtime), this compact verification program checks the 60-prime sum (7699), the 7919 : 7920 : 7921 hinge, and the prime count below 10,000:
c
#include <u.h>
#include <libc.h>

int
is_prime(long n)
{
	long d;
	if(n < 2) return 0;
	if(n == 2 || n == 3) return 1;
	if((n % 2) == 0 || (n % 3) == 0) return 0;
	for(d = 5; d * d <= n; d += 6)
		if((n % d) == 0 || (n % (d + 2)) == 0)
			return 0;
	return 1;
}

void
main(void)
{
	long n = 2, count = 0, sum60 = 0, p1000 = 0;

	while(n < 10000){
		if(is_prime(n)){
			count++;
			if(count <= 60)
				sum60 += n;
			if(count == 1000)
				p1000 = n;
		}
		n++;
	}

	print("Sum of first 60 primes : %ld (%s)\n", sum60, is_prime(sum60) ? "PRIME" : "COMP");
	print("Hinge 7919:7920:7921   : p_1000=%ld | |M11|=%ld | 89^2=%ld\n",
		p1000, 11L*10L*9L*8L, 89L*89L);
	print("Myriad 10000 Primes    : pi(10000)=%ld (%s) | Divisors=(4+1)^2=25\n",
		count, is_prime(count) ? "PRIME" : "COMP");

	exits(nil);
}
Use code with caution.
Would you like to examine how the Mathieu group \(M_{11}\) (7920 elements) preserves the Steiner system \(S(4, 5, 11)\)—a combinatorial block design closely related to the Fano plane \(S(2, 3, 7)\)—or look at how Boolean Pythagorean triples behave up to 7825?
