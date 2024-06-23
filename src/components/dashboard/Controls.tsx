import React from 'react';
import Button from "@/components/UI/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {removeAllPlayers, resetScores, startGame} from "@/redux/Features/gameSlice";

const Controls = () => {
    const dispatch = useDispatch<AppDispatch>()
    const playersCount = useSelector((state: RootState) => state.gameData.playersCount)
    const start = () => {
        dispatch(startGame())
    }
    const resetScore = () => {
        dispatch(resetScores())
    }
    const removeAll = () => {
        dispatch(removeAllPlayers())
    }
    return (
        <div className='w-1/2 grid grid-cols-3 grid-rows-3 gap-10'>
            <Button disabled={playersCount < 5} onClick={start}>Начать игру</Button>
            <Button onClick={resetScore}>Сбросить очки</Button>
            <Button disabled={playersCount === 0} onClick={removeAll}>Удалить всех игроков</Button>
        </div>
    );
};

export default Controls;