import React from 'react';
import Players from "@/components/game/Players";
import RoleInfo from "@/components/game/RoleInfo";
import Actions from "@/components/game/Actions";
import Statistic from "@/components/game/Statistic";
import {EndGameStat} from '@/components/game/EndGameStat'

const Game = () => {
    return (
        <>
            <div className='h-1/2 flex gap-3'>
                <Players/>
                <RoleInfo/>
            </div>
            <div className='h-1/2 flex justify-between gap-3'>
                <Actions/>
                <Statistic/>
            </div>
            <EndGameStat/>
        </>
    );
};

export default Game;