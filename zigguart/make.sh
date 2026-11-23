#!/usr/bin/env bash
source=./dot
target=./images
alef=alef
ziggurat=ziggurat
ziguaroth=ziguaroth

#!/usr/bin/env bash

# Define the list (array)
image_types=("svg" "png" "gif")
map_types=("imap" "cmap")

# Loop through the list

for image in $image_types; do
    echo $image
    for path in $alef $ziggurat $ziguaroth; do

	# Loop through the list
	for file in $source/*.dot; do
	    output="${target}/${path}.${image}";
	    echo "Current item: ${output} ${file}"
#	    time dot -T$image -o$output $file;
	done
    done
done

# time dot -Tsvg -o$base.svg $base.dot;
# time dot -Tsvg -o$root.svg $root.dot;

# time dot -Tpng -o$base.png $base.dot;
# time dot -Tpng -o$root.png $root.dot;

# imap and cmapx produce map files for server-side and client-side image maps.
# Graphviz generates an object's map information only if the object has a non-trival URL or href attribute, or if it has an explicit tooltip attribute.

# time dot -O -Timap -Tgif ./images/ziggurat.dot;
# time dot -O -Tcmap -Tgif ./images/ziguaroth.dot;
# time dot -Timap  -ox.map -Tgif -ox.gif x.dot;
# time dot -Tcmap -ox.map -Tgif -ox.gif x.dot;


# time dot -Tgif -o$base.gif $base.dot;
# time dot -Tgif -o$root.gif $root.dot;
# time dot -Timap -o$base.map $base.dot;
# time dot -Tcmapx -o$root.map $root.dot;

for file in $target/*; do
    echo "Found text file: $file"
done
