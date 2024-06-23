'use client'

import PlayersList from "@/components/dashboard/PlayersList";
import AddPlayer from "@/components/dashboard/AddPlayer";

export default function Page() {
    return (
        <section className='h-screen w-screen p-10 gap-5 flex flex-col justify-between'>
            <div className='h-1/2 flex justify-between'>
                <AddPlayer/>
                <PlayersList/>
            </div>
            <div className='h-1/2 flex justify-between'>
                <div className='w-1/2'>
                    CONTROLS
                </div>
                <div className='w-1/2'>
                    INFO
                </div>
            </div>
        </section>
    );
}

