import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react'
import 'overlayscrollbars/styles/overlayscrollbars.css'

const Statistic = () => {
    const log = useSelector((state: RootState) => state.gameData.game.log)
    const copy = log.join('\n')
    return (
        <section className={'flex flex-col w-1/3 gap-2'}>
            <OverlayScrollbarsComponent className='select-text border border-blue-500 rounded-xl p-3'>
                {log.map((s, index) => <li className={'list-none'} key={index}>{s}</li>)}
            </OverlayScrollbarsComponent>
            <p onClick={() => navigator.clipboard.writeText(copy)}
               className={'bg-blue-300 rounded-xl text-center hover:bg-blue-500 transition-all duration-300 ease-out active:bg-blue-300'}>Скопировать</p>
        </section>
    );
};

export default Statistic;