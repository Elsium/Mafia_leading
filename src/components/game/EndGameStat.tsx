import React from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '@/redux/store'
import Button from '@/components/UI/Button/Button'
import {Role} from '@/redux/Features/gameSlice'

const roles = {
    [Role.None]: 'Никто',
    [Role.Mafia]: 'Мафия',
    [Role.Don]: 'Дон',
    [Role.Sheriff]: 'Шериф',
    [Role.Doctor]: 'Доктор',
    [Role.Peace]: 'Мирный'
}

export const EndGameStat: React.FC = () => {
    const endGame = useSelector((state: RootState) => state.gameData.game.gameEnd)
    const [show, setShow] = React.useState(true)
    const winner = useSelector((state: RootState) => state.gameData.game.win)
    const players = useSelector((state: RootState) => state.gameData.players)

    if(!endGame) return null
    if (show) return (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 ${winner === 'Мафия' ? 'bg-red-100' : 'bg-green-100'} p-3 rounded-xl shadow-md flex flex-col gap-4 justify-between items-center`}>
            <h2 className={'text-3xl'}>Игра окончена. <span className={`inline-block p-3 rounded-xl ${winner === 'Мафия' ? 'bg-red-300' : 'bg-green-300'}`}>Победа: {winner}</span></h2>
            <div className={'flex justify-around w-full'}>
                <div className={'flex flex-col'}>
                    <h3 className={`text-xl`}>Роли</h3>
                    <ul className={'grid grid-cols-2 gap-1'}>
                        {players.map(player => (
                            <li
                                className={`${player.role === Role.Mafia || player.role === Role.Don ? 'bg-red-300' : 'bg-green-300'} rounded p-1 flex gap-3 justify-between w-full`}
                                key={player.id}>

                                <p>{player.name}</p>
                                <p>{roles[player.role]}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={'flex flex-col gap-2'}>
                    <h3 className={'text-xl'}>Текущие очки</h3>
                    <ul className={'grid grid-cols-2 gap-1'}>
                        {players.map(player => (
                            <li
                                className={`${player.role === Role.Mafia || player.role === Role.Don ? 'bg-red-300' : 'bg-green-300'} rounded p-1 flex gap-3 justify-between w-full`}
                                key={player.id}>
                                <p>{player.name}</p>
                                <p>{player.score}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Button onClick={() => setShow(false)}>Закрыть</Button>
        </div>
    )

    return null
}