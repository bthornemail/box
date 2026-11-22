#!/usr/bin/env

set -euo pipefail

IFS=$'\n\t'
dir=${BASH_SOURCE[0]%/*}
config=.config
repo=config

# Same as above (alternate syntax)
function build {
    # Loop through the list
    for image in ${image_types[@]}; do
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
}

function query {
while getopts ":Vs:f" opt; do
  case $opt in
    V) echo "$version"; exit ;;
    s) string=$OPTARG ;;
    f) flag=1 ;;
    :) echo "Missing argument for -$OPTARG" >&2; exit 1 ;;
    *) echo "Usage: $0 [-V] [-s string] [-f]"; exit 1 ;;
  esac
done
shift $((OPTIND - 1))
}
function prompt {
    declare -A sounds
    sounds[yah]="yes"
    sounds[yhwh]="yhwh"
    sounds[yahweh]="yahweh"
    sounds[god]="god"
    sounds[is]="is"
    sounds[of]="of"
    sounds[word]="word"
    
    printf "Hello %s,\n" $1
    #    echo "${sounds[@]}"   # All values
    #    echo "${!sounds[@]}"  # All keys
    #    echo "${#sounds[@]}" # Count keys
    echo "<${sounds[yah]} world=\"${sounds[@]}\" href=\"$dir/$config\">" # Yah's sound

    echo "${sounds[@]/yes/yah}"
    echo "${sounds[@]##yes}"
    if [[ -f $dir/$config ]]; then
	echo "file exists"
	while IFS= read -r line; do
	    # echo "$line"
#	     mkdir -p $dir/$repo/
	    if grep -q $line $dir/$repo; then
		echo "You appear to have typed $line in the past"
	    fi
	done <$dir/$config
#	echo ${sounds[@]}
    fi
    echo "<${sounds[yah]} world>"
    unset sounds[yah]  # Delete yah
}
# nc -p 3456 -l

prompt "Brian"

declare -i count  # Declare as type integer
count+=1          # Increment
echo $((count + 200))      # Add 200 to $a
echo $((RANDOM * count % 200))  # Random number 0..199


IFS=$'\n\t'
