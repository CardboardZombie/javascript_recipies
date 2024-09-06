```mermaid
graph TD
    A[Game Start] --> B[Initialize Player]
    A --> C[Load Game State]
    B --> E[Start Game]
    C --> D{Saved Game Exists?}
    D -- Yes --> E[Update UI]
    D -- No --> F[Alert No Saved Game]
    E --> G[Display Initial Story]
    G --> H[Succession Button Clicked]
    H --> I[Update UI with Choices]
    I --> J[Handle Choice]
    
    J --> K[Clear Description]
    K --> L[Update Score and Store]
    J --> M{Choice Includes Inspiration?}
    M -- Yes --> N[Handle Inspiration]
    M -- No --> O[Skip Inspiration]
    L --> P[Update Buttons]
    P --> Q[Wait for Button Click]
    Q --> |Success Button Click| I
    Q --> |Failure Button Click| I
    
    E --> R[Dark Mode Toggle]
    R --> S[Update Theme]
    S --> E

    click C callback "loadGame()"
    click E callback "startGame()"
    click H callback "typeWriter()"
    click J callback "handleChoice()"
    click Q callback "enableButtons()"
    click R callback "theme-toggle listener"
