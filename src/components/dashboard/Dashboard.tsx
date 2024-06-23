import React from 'react';
import AddPlayer from "@/components/dashboard/AddPlayer";
import PlayersList from "@/components/dashboard/PlayersList";
import Controls from "@/components/dashboard/Controls";
import Info from "@/components/dashboard/Info";

const Dashboard = () => {
    return (
        <>
            <div className='h-1/2 flex justify-between gap-3'>
                <AddPlayer/>
                <PlayersList/>
            </div>
            <div className='h-1/2 flex justify-between gap-3'>
                <Controls/>
                <Info/>
            </div>
        </>
    );
};

export default Dashboard;