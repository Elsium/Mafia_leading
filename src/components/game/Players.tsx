import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import ControlPlayer from "@/components/game/ControlPlayer";

const Players = () => {
    const players = useSelector((state: RootState) => state.gameData.players)
    const count = useSelector((state: RootState) => state.gameData.playersCount)
    const alive = useSelector((state:RootState) => state.gameData.game.alive)
    return (
        <div className='w-2/3 flex flex-col items-center gap-3'>
            <h2 className='text-xl font-quicksand'>Живых <span className='inline-block ml-3 font-poppins'>{alive}/{count}</span></h2>
            <ul className='w-full h-full grid xl:grid-cols-3 grid-cols-2 grid-rows-4 items-center'>
                {players.map(p => <ControlPlayer key={p.id} player={p}/>)}
            </ul>
        </div>
    );
};

export default Players;