import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react'
import 'overlayscrollbars/styles/overlayscrollbars.css'

const Statistic = () => {
    const log = useSelector((state: RootState) => state.gameData.game.log)
    return (
        <OverlayScrollbarsComponent className='w-1/3 select-text border border-blue-500 rounded-xl p-3'>
            {log.map((s, index) => <p key={index}>{s}</p>)}
        </OverlayScrollbarsComponent>
    );
};

export default Statistic;