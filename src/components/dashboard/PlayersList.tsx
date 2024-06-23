import PlayerCard from "@/components/dashboard/PlayerCard";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

export default function PlayersList() {
    const players = useSelector((state: RootState) => state.gameData.players)
    const count = useSelector((state: RootState) => state.gameData.count)
    return (
        <div className='w-1/2 flex flex-col gap-5 items-center'>
            <h2 className='text-xl font-quicksand'>Игроки <span className='inline-block ml-3 font-poppins'>{count}/12</span></h2>
            <ul className='w-full h-full grid grid-cols-3 grid-rows-4 items-center'>
                {players.map(p => <PlayerCard key={p.id} player={p}/>)}
            </ul>
        </div>
    )
}