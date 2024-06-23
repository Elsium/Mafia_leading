import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/redux/store";

export enum Role {None, Mafia, Don, Sheriff, Doctor, Peace}
export enum Phase {None, Day, Night, Vote, FirstDay}

export interface IPlayer {
    id: number,
    name: string,
    score: number,
    isAlive: boolean,
    role: Role.None | Role.Mafia | Role.Don | Role.Sheriff | Role.Doctor | Role.Peace,
    checkedBySheriff: boolean,
    checkedByDon: boolean
}
interface IGame {
    alive: number,
    isStarted: boolean,
    day: number,
    phase: Phase.None | Phase.Day | Phase.Night | Phase.Vote | Phase.FirstDay,
    action: string
    choose: {
        mafia: number,
        don: number,
        doctor: number,
        sheriff: number,
    },
    dayChoose: number
    log: string,
    gameEnd: boolean,
    win: string,
}
interface IGameState {
    players: IPlayer[],
    playersCount: number,
    game: IGame
}

const initialState: IGameState = {
    players: [],
    playersCount: 0,
    game: {
        alive: 0,
        isStarted: false,
        day: 0,
        phase: Phase.None,
        action: '',
        choose: {
            mafia: -1,
            don: -1,
            doctor: -1,
            sheriff: -1
        },
        dayChoose: -1,
        log: '',
        gameEnd: true,
        win: ''
    }
}

export const addPlayer = createAsyncThunk(
    'dashboard/addPlayer',
    async({name}: {name: string}, {getState, dispatch}) => {
        if ((getState() as RootState).gameData.playersCount !== 12) {
            const last = (getState() as RootState).gameData.players.at(-1)
            const id = last? last.id + 1 : 1
            const player: IPlayer = {
                id,
                name,
                isAlive: true,
                score: 0,
                role: Role.None,
                checkedBySheriff: false,
                checkedByDon: false
            }
            dispatch(addPlayerAction(player))
        }
    }
)

const gameSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addPlayerAction: (state, action: PayloadAction<IPlayer>) => {
            state.playersCount += 1
            state.players.push(action.payload)
        },
        removePlayer: (state, action: PayloadAction<number>) => {
            state.players = state.players.filter(p => p.id !== action.payload)
            state.playersCount -= 1
        },
        removeAllPlayers: (state) => {
            state.players = []
            state.playersCount = 0
        },
        startGame: (state) => {
            if (state.playersCount < 5) return
            gameSlice.caseReducers.resetGame(state)

            let roles: Role[] = []

            switch (state.playersCount) {
                case 5: {
                    roles = [Role.Mafia, Role.Doctor, Role.Peace, Role.Peace, Role.Peace]
                    break
                }
                case 6: {
                    roles = [Role.Mafia, Role.Don, Role.Doctor, Role.Peace, Role.Peace, Role.Peace]
                    break
                }
                case 7: {
                    roles = [Role.Mafia, Role.Mafia, Role.Doctor, Role.Sheriff, Role.Peace, Role.Peace, Role.Peace]
                    break
                }
                case 8: {
                    roles = [Role.Mafia, Role.Mafia, Role.Don, Role.Doctor, Role.Sheriff, Role.Peace, Role.Peace, Role.Peace]
                    break
                }
                case 9: {
                    roles = [Role.Mafia, Role.Mafia, Role.Don, Role.Doctor, Role.Sheriff, Role.Peace, Role.Peace, Role.Peace, Role.Peace]
                    break
                }
                case 10: {
                    roles = [Role.Mafia, Role.Mafia, Role.Mafia, Role.Don, Role.Doctor, Role.Sheriff, Role.Peace, Role.Peace, Role.Peace, Role.Peace]
                    break
                }
                case 11: {
                    roles = [Role.Mafia, Role.Mafia, Role.Mafia, Role.Don, Role.Doctor, Role.Sheriff, Role.Peace, Role.Peace, Role.Peace, Role.Peace, Role.Peace]
                    break
                }
                case 12: {
                    roles = [Role.Mafia, Role.Mafia, Role.Mafia, Role.Don, Role.Doctor, Role.Sheriff, Role.Peace, Role.Peace, Role.Peace, Role.Peace, Role.Peace, Role.Peace]
                    break
                }
            }
            function shuffleArray(array: Role[]) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }

            roles = shuffleArray(roles)

            state.players.forEach((player, index) => {
                player.role = roles[index]
                player.isAlive = true
                player.checkedBySheriff = false
                player.checkedByDon = false
            })

            state.game.isStarted = true
            state.game.action = 'Первый день'
            state.game.phase = Phase.FirstDay
            state.game.alive = state.playersCount
            state.game.day = 1
            state.game.gameEnd = false
        },
        changePhase: (state) => {
            switch(state.game.phase) {
                case Phase.Day: {
                    state.game.phase = Phase.Vote
                    state.game.action = 'Голосование'
                    break
                }
                case Phase.Night: {
                    state.game.action = 'День'
                    gameSlice.caseReducers.calculateNight(state)
                    gameSlice.caseReducers.clearChoose(state)
                    state.game.phase = Phase.Day
                    break
                }
                case Phase.Vote: {
                    state.game.action = 'Ночь'
                    gameSlice.caseReducers.VoteResult(state)
                    gameSlice.caseReducers.ClearVote(state)
                    gameSlice.caseReducers.checkEndGame(state)
                    state.game.phase = Phase.Night
                    state.game.day += 1
                    break
                }
                case Phase.FirstDay: {
                    state.game.phase = Phase.Night
                    state.game.action = 'Ночь'
                    break
                }
                default: {
                    console.error('error phase tip')
                }
            }
        },
        checkEndGame: (state) => {
            const mafiaCount = state.players.filter(player => (player.role === Role.Mafia || player.role === Role.Don) && player.isAlive).length
            const peaceCount = state.players.filter(player => (player.role === Role.Peace || player.role === Role.Doctor || player.role === Role.Sheriff) && player.isAlive).length
            if (mafiaCount === 0) {
                gameSlice.caseReducers.endGame(state, {payload: 'P', type: 'dashboard/endGame'})
            } else if (mafiaCount + 1 === peaceCount) {
                gameSlice.caseReducers.endGame(state, {payload: 'M', type: 'dashboard/endGame'})
            }
        },
        MafiaChoose: (state, action: PayloadAction<number>) => {
            state.game.choose.mafia = action.payload
        },
        DonChoose: (state, action: PayloadAction<number>) => {
            state.game.choose.don = action.payload
        },
        DoctorChoose: (state, action: PayloadAction<number>) => {
            state.game.choose.doctor = action.payload
        },
        SheriffChoose: (state, action: PayloadAction<number>) => {
            state.game.choose.sheriff = action.payload
        },
        calculateNight: (state) => {
            const {mafia, doctor, sheriff, don} = state.game.choose

            if (mafia !== doctor) {
                const target = state.players.find(p => p.id === mafia)
                if (target) {
                    target.isAlive = false
                    state.game.alive -= 1
                }
            } else if (doctor !== -1 && mafia !== -1) {
                const doctorPlayer = state.players.find(p => p.role === Role.Doctor)
                if (doctorPlayer) {
                    doctorPlayer.score += 1
                }
            }

            const sheriffTarget = state.players.find(p => p.id === sheriff)
            const donTarget = state.players.find(p => p.id === don)
            if (sheriffTarget && sheriffTarget.checkedBySheriff !== true) {
                sheriffTarget.checkedBySheriff = true
                if (sheriffTarget.role === Role.Mafia || sheriffTarget.role === Role.Don) {
                    const sheriffPlayer = state.players.find(player => player.role === Role.Sheriff)
                    if (sheriffPlayer) {
                        sheriffPlayer.score += 1
                    }
                }
            }

            if (donTarget && donTarget.checkedByDon !== true) {
                donTarget.checkedByDon = true
                if (donTarget.role === Role.Sheriff || donTarget.role === Role.Doctor) {
                    const donPlayer = state.players.find(player => player.role === Role.Don)
                    if (donPlayer) {
                        donPlayer.score += 1
                    }
                }
            }
        },
        clearChoose: (state) => {
            state.game.choose.mafia = -1
            state.game.choose.don = -1
            state.game.choose.doctor = -1
            state.game.choose.sheriff = -1
        },
        VoteChoose: (state, action: PayloadAction<number>) => {
            state.game.dayChoose = action.payload
        },
        ClearVote: (state) => {
            state.game.dayChoose = -1
        },
        VoteResult: (state) => {
            if (state.game.dayChoose !== -1) {
                const playerIndex = state.players.findIndex(player => player.id === state.game.dayChoose);
                if (playerIndex !== -1) {
                    state.players[playerIndex].isAlive = false;
                    state.game.alive -= 1;
                }
            }
        },
        addScore: (state, action: PayloadAction<number>) => {
            const target = state.players.find(p => p.id === action.payload)
            if(target) target.score += 1
        },
        resetGame: (state) => {
            state.players.forEach(player => {
                player.role = Role.None;
                player.checkedBySheriff = false
                player.checkedByDon = false
                player.isAlive = true
            })
            const update: IGame = {
                alive: 0,
                isStarted: false,
                day: 0,
                phase: Phase.None,
                action: '',
                choose: {
                    mafia: -1,
                    don: -1,
                    doctor: -1,
                    sheriff: -1
                },
                dayChoose: -1,
                log: '',
                gameEnd: true,
                win: ''
            }
            state.game = update
        },
        resetScores: (state) => {
            state.players.forEach(player => {
                player.score = 0
            })
        },
        endGame: (state, action: PayloadAction<'M' | 'P'>) => {
            const winner = action.payload;
            state.players.forEach(player => {
                switch (winner) {
                    case 'M':
                        state.game.win = 'Мафия'
                        if (player.isAlive) {
                            switch (player.role) {
                                case Role.Mafia:
                                case Role.Don:
                                    player.score += 3
                                    break
                            }
                        } else {
                            if (player.role === Role.Mafia) {
                                player.score += 2
                            }
                        }
                        break
                    case 'P':
                        state.game.win = 'Мирные'
                        switch (player.role) {
                            case Role.Sheriff:
                                player.score += player.isAlive ? 3 : 2
                                break
                            case Role.Doctor:
                                player.score += player.isAlive ? 2 : 1
                                break
                            case Role.Peace:
                                player.score += player.isAlive ? 2 : 1
                                break
                        }
                        break
                }
            });
            state.game.gameEnd = true
        },
    }
})

export const {resetGame, resetScores, addScore, VoteChoose, SheriffChoose, DoctorChoose, DonChoose, MafiaChoose, changePhase, removeAllPlayers, addPlayerAction, removePlayer, startGame, endGame} = gameSlice.actions
export default gameSlice.reducer