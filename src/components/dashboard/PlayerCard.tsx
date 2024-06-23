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
        <li className={`select-none bg-gray-200 rounded-2xl w-52 h-14 flex justify-center items-center font-quicksand text-pink-500 mx-auto relative ${style.card}`}>
            {player.name}
            <button onClick={deletePlayer} className={`absolute top-1.5 right-1 p-2 hidden ${style.delete} text-red-600 rounded-full hover:bg-gray-300`}><DeleteForeverIcon/></button>
        </li>
    );
};

export default PlayerCard;