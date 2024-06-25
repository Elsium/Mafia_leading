import React, {useState} from 'react';
import {
    addScore,
    DoctorChoose,
    DonChoose,
    IPlayer,
    MafiaChoose,
    Phase,
    Role,
    SheriffChoose,
    VoteChoose
} from "@/redux/Features/gameSlice";
import PlusOneIcon from '@mui/icons-material/PlusOne';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SearchIcon from '@mui/icons-material/Search';
import MedicationIcon from '@mui/icons-material/Medication';
import ExploreIcon from '@mui/icons-material/Explore';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";

interface IProps {
    player: IPlayer,
    isDon: boolean,
    isSheriff: boolean,
    isDoctor: boolean
}

const ControlPlayer = ({player, isDon, isSheriff, isDoctor}: IProps) => {
    const [plus, setPlus] = useState(true)
    const game = useSelector((state: RootState) => state.gameData.game)
    const countPlayers = useSelector((state: RootState) => state.gameData.playersCount)
    let color = ''
    switch(player.role) {
        case Role.Mafia: {
            color = 'bg-red-400'
            break
        }
        case Role.Don: {
            color = "bg-red-600"
            break
        }
        case Role.Doctor: {
            color = "bg-blue-500"
            break
        }
        case Role.Sheriff: {
            color = "bg-yellow-400"
            break
        }
        default: {
            color = "bg-gray-300"
        }
    }
    if (!player.isAlive) color = "bg-black text-white"

    const dispatch = useDispatch<AppDispatch>()
    const mafia = () => {
        dispatch(MafiaChoose(player.id))
    }
    const don = () => {
        dispatch(DonChoose(player.id))
    }
    const doctor = () => {
        dispatch(DoctorChoose(player.id))
    }
    const sheriff = () => {
        dispatch(SheriffChoose(player.id))
    }
    const vote = () => {
        dispatch(VoteChoose(player.id))
    }
    const add = () => {
        dispatch(addScore(player.id))
        setPlus(false)
    }

    return (
        <li className={`${color} select-none rounded-2xl lg:w-5/6 w-11/12 h-16 p-3 flex justify-between items-center lg:gap-2 gap-1 mx-auto relative`}>
            <div className='flex lg:gap-2 gap-1'>
                <p className='font-quicksand font-semibold xl:text-base lg:text-sm text-xs'>{player.name}</p>
                <p className='font-poppins lg:text-base text-sm'>{player.score}</p>
            </div>
            <div className='flex lg:gap-1 gap-0.5'>
                <button onClick={mafia} disabled={game.phase !== Phase.Night || !player.isAlive} className={`transition-opacity disabled:opacity-0 ${player.id === game.choose.mafia ? 'bg-black rounded-full text-white' : ''}`}><WhatshotIcon fontSize={'small'}/></button>
                <button onClick={don} disabled={game.phase !== Phase.Night || !player.isAlive || player.role === Role.Mafia || player.role === Role.Don || !isDon || player.checkedByDon} className={` transition-opacity ${player.checkedByDon ? 'bg-red-600 rounded-full text-white' : 'disabled:opacity-0'} ${player.id === game.choose.don ? 'bg-black rounded-full text-white' : ''}`}><ExploreIcon fontSize={'small'}/></button>
                <button onClick={doctor} disabled={game.phase !== Phase.Night || !player.isAlive || !isDoctor || player.role === Role.Doctor && game.doctorDelay > 0} className={`transition-opacity disabled:opacity-0 ${player.id === game.choose.doctor ? 'bg-black rounded-full text-white' : ''}`}><MedicationIcon fontSize={'small'}/></button>
                <button onClick={sheriff} disabled={game.phase !== Phase.Night || !player.isAlive || player.role === Role.Sheriff || !isSheriff || player.checkedBySheriff} className={`transition-opacity ${player.checkedBySheriff ? 'bg-yellow-400 rounded-full text-white' : 'disabled:opacity-0'} ${player.id === game.choose.sheriff ? 'bg-black rounded-full text-white' : ''}`}><SearchIcon fontSize={'small'}/></button>
                <button onClick={vote} disabled={game.phase !== Phase.Vote || !player.isAlive} className={`transition-opacity disabled:opacity-0 ${player.id === game.dayChoose ? 'bg-black rounded-full text-white' : ''}`}><HowToRegIcon fontSize={'small'}/></button>
                <button onClick={add} disabled={!plus} className='transition-opacity disabled:opacity-0'><PlusOneIcon fontSize={'small'}/></button>
            </div>
        </li>
    );
};

export default ControlPlayer;