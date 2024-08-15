import React from 'react';
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ExploreIcon from "@mui/icons-material/Explore";
import MedicationIcon from "@mui/icons-material/Medication";
import SearchIcon from "@mui/icons-material/Search";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const RoleInfo = () => {
    return (
        <div className='w-1/3 flex flex-col items-center gap-3'>
            <h2 className='text-xl font-quicksand'>Значения цветов и иконок</h2>
            <div className='grid grid-cols-2 gap-5'>
                <div className='flex items-center gap-2'>
                    <div className='w-5 h-5 bg-gray-300 rounded'></div>
                    <p>Мирный</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-5 h-5 bg-red-400 rounded'></div>
                    <p>Мафия</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-5 h-5 bg-red-600 rounded'></div>
                    <p>Дон</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-5 h-5 bg-blue-500 rounded'></div>
                    <p>Доктор</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-5 h-5 bg-yellow-400 rounded'></div>
                    <p>Шериф</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-5 h-5 bg-black rounded'></div>
                    <p>Мертвый</p>
                </div>
                <div className='flex items-center gap-2'>
                    <WhatshotIcon/>
                    <p>Выбор мафии</p>
                </div>
                <div className='flex items-center gap-2'>
                    <ExploreIcon/>
                    <p>Выбор дона</p>
                </div>
                <div className='flex items-center gap-2'>
                    <MedicationIcon/>
                    <p>Выбор доктора</p>
                </div>
                <div className='flex items-center gap-2'>
                    <SearchIcon/>
                    <p>Выбор шерифа</p>
                </div>
                <div className='flex items-center gap-2'>
                    <HowToRegIcon/>
                    <p>Выбор дневного голосования</p>
                </div>
                <div className='flex items-center gap-2'>
                    <PlusOneIcon/>
                    <p>Добавить 1 очко</p>
                </div>
                <div className='flex items-center gap-2'>
                    <IndeterminateCheckBoxIcon/>
                    <p>Убрать 1 очко</p>
                </div>
            </div>
        </div>
    );
};

export default RoleInfo;