#!/usr/bin/env bash

dir=${BASH_SOURCE[0]%/*}
#function query {
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
#}

read -r -p "Proceed? [y/n] " ans
IFS= read -s -r -p "Password: " pass  # no echo
echo "$ans"

