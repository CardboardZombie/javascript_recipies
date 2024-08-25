```mermaid
graph TD
   0[0]:::correct --> N1A[23]:::correct
    0 --> N1B[11]:::correct

    N1A --> N2A[40]:::correct
    N1A --> N2B[33]:::correct
    N1B --> N2B:::correct

    N2A --> N3[4]:::correct
    N2B --> N3[4]

    N3 --> N4A[27]:::correct
    N3 --> N4B[3]:::correct

    N4B --> N5[19]:::correct
    N4B --> N6[34]
    N4A --> N5
    N5 --> N6:::correct

    N6 --> N6A[41]:::correct
    N6 --> N6B[20]:::correct

    N6A --> N7A[2]:::bonus
    N6A --> N7B[36]:::correct
    N6B --> N7B
    N6B --> N7C[15]:::bonus

    N7A --> N8[44]
    N7B --> N8:::correct
    N7C --> N8

    N8 --> N9[28]:::correct

    N9 --> N10[32]:::correct

    N10 --> N11A[12]:::correct
    N10 --> N11B[46]:::correct

    N11A --> N12A[9]:::bonus
    N11A --> N12B[18]:::correct
    N11B --> N12B
    N11B --> N12C[29]:::bonus
    
    N12A --> N13[13]:::correct
    N12B --> N13
    N12C --> N13
    
    N13 --> N14A[38]:::correct
    N13 --> N14B[14]:::correct
    
    N14A --> N15A[31]:::bonus
    N14A --> N15B[10]:::correct
    N14B --> N15B
    N14B --> N15C[42]:::bonus

    N15A --> N16[39]:::correct
    N15B --> N16
    N15C --> N16

    N16 --> N17B[24]:::correct
    N16 --> N17A[43]:::correct

    N17B --> N18A[16]:::bonus
    N17B --> N18B[7]:::correct
    N17A --> N18C[45]:::correct
    N17A --> N18B

    N18A --> N19[25]:::correct
    N18B --> N19
    N18C --> N19

    N19 --> N20A[37]:::correct
    N19 --> N20B[6]:::correct

    N20A --> N21A[17]:::bonus
    N20A --> N21B[47]:::correct
    N20B --> N21C[22]:::correct
    N20B --> N21B

    N21A --> N22[30]:::correct
    N21B --> N22
    N21C --> N22

    N22 --> N23[26]:::bonus

    N23 --> N24A[21]:::correct
    N23 --> N24B[35]:::correct

    N24A --> N25A[5]:::correct
    N24B --> N24A

    N25A --> N26A[48]:::bonus
    N24A --> N26A
    N25A --> N26B[8]:::correct
    N26B --> GameOver:::incorrect

    N26A --> ChapterEnd:::incorrect


    classDef node fill:#EF004B,stroke:#5C442A,stroke-width:4px;
    classDef correct fill:#00FF00,stroke:#444,stroke-width:2px, color:green;
    classDef incorrect fill:#FF0000,stroke:#333,stroke-width:2px, color:darkred;
    classDef bonus fill:#0000FF,stroke:#333,stroke-width:2px, color:darkblue;
 
    class 0,N1A,N2A correct;
    class N23B incorrect;
