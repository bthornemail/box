#!/usr/bin/env bash

set -euo pipefail

IFS=$'\n\t'
dir=${BASH_SOURCE[0]%/*}

source=dot
target=images
alef=alef
ziggurat=ziggurat
ziguaroth=ziguaroth

time dot -Tplain -o${dir}/${target}/${ziguaroth}.txt ${dir}/${source}/${ziguaroth}.dot;
time dot -Tplain -o${dir}/${target}/${ziggurat}.txt ${dir}/${source}/${ziggurat}.dot;

time dot -Tplain-ext -o${dir}/${target}/${ziguaroth}.text ${dir}/${source}/${ziguaroth}.dot;
time dot -Tplain-ext -o${dir}/${target}/${ziggurat}.text ${dir}/${source}/${ziggurat}.dot;

time dot -Tsvg -o${dir}/${target}/${alef}.svg ${dir}/${source}/${alef}.dot;
time dot -Tsvg -o${dir}/${target}/${ziggurat}.svg ${dir}/${source}/${ziggurat}.dot;
time dot -Tsvg -o${dir}/${target}/${ziguaroth}.svg ${dir}/${source}/${ziguaroth}.dot;

# imap and cmapx produce map files for server-side and client-side image maps.
# Graphviz generates an object's map information only if the object has a non-trival URL or href attribute, or if it has an explicit tooltip attribute.

time dot -Timap -o${dir}/${target}/${alef}.map -Tgif -o${dir}/${target}/${alef}.gif ${dir}/${source}/${alef}.dot;
time dot -Timap -o${dir}/${target}/${ziggurat}.map -Tgif -o${dir}/${target}/${ziggurat}.gif ${dir}/${source}/${ziggurat}.dot;
time dot -Tcmap -o${dir}/${target}/${ziguaroth}.map -Tgif -o${dir}/${target}/${ziguaroth}.gif ${dir}/${source}/${ziguaroth}.dot;


time dot -Tpng -o${dir}/${target}/${alef}.png ${dir}/${source}/${alef}.dot;
time dot -Tpng -o${dir}/${target}/${ziggurat}.png ${dir}/${source}/${ziggurat}.dot;
time dot -Tpng -o${dir}/${target}/${ziguaroth}.png ${dir}/${source}/${ziguaroth}.dot;
