import React from 'react';
import GameGrid from './GameGrid';

const GamingPage = () => {
    return (
        <div className="p-2 bg-[#f7f7f7] dark:bg-[#18191a] h-[100vh]">
            <p className="text-sm italic text-gray-500"></p>
            <GameGrid />
        </div>
    );
};

export default GamingPage;