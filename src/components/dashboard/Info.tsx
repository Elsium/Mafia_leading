import React from 'react';
import style from './Info.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const Info = () => {
    const playersCount = useSelector((state: RootState) => state.gameData.playersCount)
    return (
        <div className={`w-1/2 pl-20 ${style.container}`}>
            <h2 className='font-poppins font-semibold'>Колличество ролей</h2>
            <p className={`${playersCount < 5 ? '' : 'hidden'}`}>Минимум 5 игроков</p>
            <p className={`${playersCount === 5 ? '' : 'hidden'}`}>1 мафия, 1 доктор, 3 мирных</p>
            <p className={`${playersCount === 6 ? '' : 'hidden'}`}>1 мафия, 1 дон, 1 доктор, 3 мирных</p>
            <p className={`${playersCount === 7 ? '' : 'hidden'}`}>2 мафии, 1 доктор, 1 шериф, 3 мирных</p>
            <p className={`${playersCount === 8 ? '' : 'hidden'}`}>2 мафии, 1 дон, 1 доктор, 1 шериф, 3 мирных</p>
            <p className={`${playersCount === 9 ? '' : 'hidden'}`}>2 мафии, 1 дон, 1 доктор, 1 шериф, 3 мирных</p>
            <p className={`${playersCount === 10 ? '' : 'hidden'}`}>3 мафии, 1 дон, 1 доктор, 1 шериф, 3 мирных</p>
            <p className={`${playersCount === 11 ? '' : 'hidden'}`}>3 мафии, 1 дон, 1 доктор, 1 шериф, 4 мирных</p>
            <p className={`${playersCount === 12 ? '' : 'hidden'}`}>3 мафии, 1 дон, 1 доктор, 1 шериф, 5 мирных</p>
        </div>
    );
};

export default Info;