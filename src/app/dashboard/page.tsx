'use client'
import Dashboard from "@/components/dashboard/Dashboard";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import Game from "@/components/game/Game";

export default function Page() {
    const isStarted = useSelector((state: RootState) => state.gameData.game.isStarted)
    return (
        <section className='h-screen w-screen p-10 gap-5 flex flex-col justify-between select-none'>
            {isStarted && <Game/> ||<Dashboard/>}
        </section>
    );
}

