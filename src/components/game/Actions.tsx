import React from 'react';
import Button from "@/components/UI/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {changePhase, endGame, Phase, resetGame, VoteChoose} from "@/redux/Features/gameSlice";
import DoneIcon from '@mui/icons-material/Done';


const Actions = () => {
    const dispatch = useDispatch<AppDispatch>()
    const game = useSelector((state: RootState) => state.gameData.game)
    const phase = () => {
        dispatch(changePhase())
    }
    const reset = () => {
        dispatch(resetGame())
    }
    const skip = () => {
        dispatch(VoteChoose(-1))
    }
    const endM = () => {
        dispatch(endGame('M'))
    }
    const endP = () => {
        dispatch(endGame('P'))
    }

    return (
        <div className='w-2/3 flex flex-col items-center gap-10'>
            <div className='flex gap-10'>
                <p className='p-3 bg-blue-500 rounded-2xl text-white'>День: {game.day}</p>
                {!game.gameEnd && <p className='p-3 bg-blue-500 rounded-2xl text-white'>Фаза: {game.action}</p> || <p className='p-3 bg-blue-500 rounded-2xl text-white'>Победа: {game.win}</p>}
            </div>
            <div className='grid grid-cols-3 grid-rows-3 gap-10'>
                <Button onClick={phase} disabled={game.gameEnd}>Сменить фазу</Button>
                <Button onClick={reset}>Выйти</Button>
                <Button disabled={game.phase !== Phase.Vote} onClick={skip}>Скип дневного голосования {game.dayChoose === -1 && <DoneIcon/>}</Button>
                <Button onClick={endP} disabled={game.gameEnd}>Победа мирных</Button>
                <Button onClick={endM} disabled={game.gameEnd}>Победа мафии</Button>
            </div>
        </div>
    );
};

export default Actions;