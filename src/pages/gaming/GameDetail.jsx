import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { gameDatas } from './GameGrid';
const GameDetail = () => {
    const { slug } = useParams();
    const [game, setGame] = useState(null);

    // Simulating data fetch - in real app would fetch from API/database
    useEffect(() => {
        // Example game data
        const gameData = gameDatas.find(game => game.slug === slug);

        setGame(gameData);
    }, [slug]);

    if (!game) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 dark:bg-[#18191a]">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-white dark:bg-[#18191a] rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{game.title}</h1>

                        <div className="mb-6">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                {game.category}
                            </span>
                        </div>

                        <div className="aspect-w-16 aspect-h-9 mb-6">
                            <iframe
                                src={`https://html5.gamedistribution.com/${game.gameMd5}/?gd_sdk_referrer_url=https://www.example.com/games/${game.slug}`}
                                className="w-full h-[600px]"
                                frameBorder="0"
                                scrolling="no"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <h2 className="text-xl font-semibold mb-4">About this game</h2>
                                <p className="text-gray-600 mb-6">{game.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {game.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="bg-gray-100  text-gray-600 px-3 py-1 rounded-full text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg dark:bg-[#18191a]">
                                <h3 className="font-semibold mb-4">Game Info</h3>
                                <div className="space-y-2">
                                    <p className="text-sm">
                                        <span className="text-gray-500">Developer:</span> {game.company}
                                    </p>
                                    <p className="text-sm">
                                        <span className="text-gray-500">Category:</span> {game.category}
                                    </p>
                                    <p className="text-sm">
                                        <span className="text-gray-500">Platform:</span> Web Browser
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetail;