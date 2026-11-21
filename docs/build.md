these are 3 vertices of a time/logical crystal tetrahedron , i use time/logic becuase its a pur periodicity frame of reference the virtual centroid of a foruth vertice makes the centroid like a slide ruler making the 1/7, 1/73, 123456789/999999999, where beow  $prime is any prime number and $scalar is any scale 

# read scalar;
# read prime;
scalar=2;
prime=17;
point=$(($prime-1));
space=$(($point * $scalar));
# echo $point
# echo $scale
# echo "scale=${point}; 1/${prime};" | bc > min.prime.value
# echo "scale=${space}; 1/${prime};" | bc > max.prime.value
# diff min.prime.value max.prime.value
echo "scale=${point}; 1/7;1/73;123456789/999999999;1/${prime};" | bc > point
echo "scale=72;  1/7;1/73;123456789/999999999;1/${prime};" | bc > line
echo "scale=${space};  1/7;1/73;123456789/999999999;1/${prime};" | bc > space
diff -d point space | diff -d line -