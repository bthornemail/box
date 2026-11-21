echo digraph zig { blips \-\> { rank=same\; {0..1}{0..3}{0..5}{0..7}\; } \-\>\ braille \-\> { rank=same\; 2\; 4\; 6\; 8\; } pips \-\> { rank=same\; {0..2}{0..4}{0..8}\; } \-\> aegean \-\> { rank=same\; 3\; 5\; 9\; } { rank=same\; blips\; aegean\; } \-\> dominoes\; { rank=same\; braille\; pips\; } \-\> cubes\; }   | dot -Tsvg -o zig.svg

