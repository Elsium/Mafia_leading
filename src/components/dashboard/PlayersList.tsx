import PlayerCard from "@/components/dashboard/PlayerCard";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

export default function PlayersList() {
    const players = useSelector((state: RootState) => state.gameData.players)
    const count = useSelector((state: RootState) => state.gameData.playersCount)
    return (
        <div className='w-1/2 flex flex-col gap-5 items-center'>
            <h2 className='text-xl font-quicksand'>Игроки <span className='inline-block ml-3 font-poppins'>{count}/12</span></h2>
            <ul className='w-full h-full grid grid-cols-2 lg:grid-cols-3 grid-rows-4 items-center'>
                {players.map((p, index) => <PlayerCard key={p.id} player={p} index={index}/>)}
            </ul>
        </div>
    )
}