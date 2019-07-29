export const pageMap = {
    playerSetup: 'playerSetup',
    characters: 'characters',
    assignCharacters: 'assignCharacters',
    mission: 'mission',
    goodGame: 'goodGame'
}

export const evilRoles = ['mordred', 'morgana', 'oberon', 'assassin', 'minion'];

// player count: set up
// when twoFail is true, we need 2 fails for round[3] (4th round)
export const rules = { 
    5: {
        roundTeamCount: [2, 3, 2, 3, 3],
        twoFail: false
    },
    6: {
        roundTeamCount: [2, 3, 4, 3, 4],
        twoFail: false
    },
    7: {
        roundTeamCount: [2, 3, 3, 4, 4],
        twoFail: true
    },
    8: {
        roundTeamCount: [3, 4, 4, 5, 5],
        twoFail: true
    },
    9: {
        roundTeamCount: [3, 4, 4, 5, 5],
        twoFail: true
    },
    10: {
        roundTeamCount: [3, 4, 4, 5, 5],
        twoFail: true
    },
}