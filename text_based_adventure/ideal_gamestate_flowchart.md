```mermaid
graph TD

A[Game Start] --> B[Initialize Player Stats]
    A --> C[Load Game State]
    B --> E[Start Game]
    C --> D{Saved Game Exists?}
    D -- Yes --> F[Load Saved Game]
    D -- No --> G[Initialize New Game]
    F --> H[Update UI]
    G --> E[Start Game]
    E --> I[Display Initial Story]
    I --> J[Add Event Listeners]
    
    J --> K[Succession Button Clicked]
    K --> L[Disable Buttons]
    L --> M[Clear Description]
    M --> N[Handle Choice]
    
    N --> O{Choice Includes Inspiration?}
    O -- Yes --> P[Handle Inspiration]
    O -- No --> Q[Skip Inspiration]

    P --> R[Update Score and Inventory]
    Q --> R[Update Score and Inventory]
    
    R --> S[Update Store]
    S --> T[Enable Buttons]
    
    T --> U[Update Buttons and UI]
    U --> V[Wait for Button Click]
    V --> |Success Button Click| K
    V --> |Failure Button Click| K
    
    E --> W[Dark Mode Toggle]
    W --> X[Update Theme]
    X --> H[Update UI]
    
    click C callback "loadGame()"
    click E callback "startGame()"
    click I callback "typeWriter()"
    click K callback "handleChoice()"
    click W callback "theme-toggle listener"