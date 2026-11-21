#!/data/data/com.termux/files/usr/bin/bash
previous=$'\U10100';
current=$'\U10101';
next=$'\U10102';
repetands=(1/7 1/73 123456789/999999999)
# read scalar;
# read prime;
scalar=2;
prime=17;
point=$(($prime-1));
space=$(($point * $scalar));
scale=72;
U10100="scale=${point};1/7;"
U10101="scale=${scale};1/73;"
U10102="scale=${scale};123456789/999999999;"

U10107="scale=${scale};1/${prime};"
echo "Welcome to the ZIGUAROTH build for the zigguart tetragrammatron";

echo $U10100 | bc
# **`for (( i=20; i>0; i-- ))`**: Counts backward from 20 to 1.
# **`clear`**: Clears the terminal screen on each tick.
# **`echo -n "$i"`**: Prints the remaining seconds without a trailing newline.
# **`sleep 1`**: Pauses execution for one second per iteration.

# echo $point
# echo $scale
# echo "scale=${point}; 1/${prime};" | bc > min.prime.value
# echo "scale=${space}; 1/${prime};" | bc > max.prime.value
# diff min.prime.value max.prime.value
# echo "scale=${point}; 1/7;1/73;123456789/999999999;1/${prime};" | bc > point
# echo "scale=72;  1/7;1/73;123456789/999999999;1/${prime};" | bc > line
# echo "scale=${space};  1/7;1/73;123456789/999999999;1/${prime};" | bc > space
# diff -d point space | diff -d line -
