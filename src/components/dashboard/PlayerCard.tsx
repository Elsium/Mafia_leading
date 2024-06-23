import React from 'react';
import {IPlayer, removePlayer} from "@/redux/Features/gameSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import style from './PlayerCard.module.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface IProps {
    player: IPlayer
}

const PlayerCard = ({player}: IProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const deletePlayer = () => {
        dispatch(removePlayer(player.id))
    }

    return (
        <li className={`select-none bg-gray-200 rounded-2xl w-52 h-14 p-3 flex justify-start items-center gap-5 mx-auto relative ${style.card}`}>
            <p className='font-quicksand text-blue-700'>{player.name}</p>
            <p className='font-poppins'>{player.score}</p>
            <button onClick={deletePlayer} className={`absolute top-1.5 right-1 p-2 opacity-0 transition-all duration-200 ${style.delete} text-red-600 rounded-full hover:bg-gray-300`}><DeleteForeverIcon/></button>
        </li>
    );
};

export default PlayerCard;