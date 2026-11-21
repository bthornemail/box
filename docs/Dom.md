digraph G {
    // Set a clean layout and style
    rankdir=LR; // Layout from Left to Right
    node [shape=none, fontname="Arial", fontsize=14];
    edge [color="gray50", penwidth=1.5];

    // Domino 1: 3-5
    domino_3_5 [label=<
        <TABLE BORDER="2" CELLBORDER="0" CELLSPACING="0" CELLPADDING="8" BGCOLOR="white">
            <TR><TD HEIGHT="30" WIDTH="30" ALIGN="CENTER" VALIGN="MIDDLE">●  <BR/>  ●  <BR/>    ●</TD></TR>
            <TR><TD BORDER="1" SIDES="T" HEIGHT="0" PADDING="0"></TD></TR> <!-- Divider Line -->
            <TR><TD HEIGHT="30" WIDTH="30" ALIGN="CENTER" VALIGN="MIDDLE">●   ●<BR/>  ●  <BR/>●   ●</TD></TR>
        </TABLE>
    >];

    // Domino 2: 5-2
    domino_5_2 [label=<
        <TABLE BORDER="2" CELLBORDER="0" CELLSPACING="0" CELLPADDING="8" BGCOLOR="white">
            <TR><TD HEIGHT="30" WIDTH="30" ALIGN="CENTER" VALIGN="MIDDLE">●   ●<BR/>  ●  <BR/>●   ●</TD></TR>
            <TR><TD BORDER="1" SIDES="T" HEIGHT="0" PADDING="0"></TD></TR> <!-- Divider Line -->
            <TR><TD HEIGHT="30" WIDTH="30" ALIGN="CENTER" VALIGN="MIDDLE">●    <BR/>     <BR/>    ●</TD></TR>
        </TABLE>
    >];

    // Domino 3: 2-2 (Double)
    domino_2_2 [label=<
        <TABLE BORDER="2" CELLBORDER="0" CELLSPACING="0" CELLPADDING="8" BGCOLOR="white">
            <TR><TD HEIGHT="30" WIDTH="30" ALIGN="CENTER" VALIGN="MIDDLE">●    <BR/>     <BR/>    ●</TD></TR>
            <TR><TD BORDER="1" SIDES="T" HEIGHT="0" PADDING="0"></TD></TR> <!-- Divider Line -->
            <TR><TD HEIGHT="30" WIDTH="30" ALIGN="CENTER" VALIGN="MIDDLE">●    <BR/>     <BR/>    ●</TD></TR>
        </TABLE>
    >];

    // Connect the dominoes to simulate a chain
    domino_3_5 -> domino_5_2 -> domino_2_2;
}

digraph G {
    node [shape=record];
    domino1 [label="{ 3 | 5 }"];
    domino2 [label="{ 5 | 2 }"];
    domino1 -> domino2;
}

