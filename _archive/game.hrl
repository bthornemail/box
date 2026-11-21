
-record(game, {structres, sequences}).
-record(rules, {name, phone, address}).
-record(braille, { 1, 2, 3, 4, 5, 6, 7, 8 }).
-record(aegean, {1, 2, 3, 4, 5, 6, 7, 8 ,9 }).
-record(omino, { blocks, blips }).
-record(cube, { pixels, pips }).

-record(room, { players, positions }).
-record(board, { length, width, heigth, resolution }).
-record(path, { source, target, from, to }).
-record(positions, {graph, layer, node, edge ).
-record(rotation, { up, down, left, right, front, back ).

