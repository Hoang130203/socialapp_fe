import { useState } from 'react';
import { Link } from 'react-router-dom';
export const gameDatas = [
    {
        "slug": "block-tnt-blast",
        "title": "Block TNT Blast",
        "description": "Block TNT Blast is an exciting sandbox simulation game that will ignite your imagination and strategic skills.",
        "category": "Simulation",
        "gameMd5": "008f3e2291824a30957bee2f91951b01",
        "tags": ["bomb", "boy", "idle", "minecraft"]
    },
    {
        "slug": "idle-trade-isle",
        "title": "Idle Trade Isle",
        "description": "Idle Trade Isle is a casual simulation game. Let's go on an island adventure on the sea!",
        "category": "Casual",
        "gameMd5": "da8cd489a75b4777b03b0008d4e9de95",
        "tags": ["business", "idle", "island"]
    },
    {
        "slug": "extreme-run-3d",
        "title": "Extreme Run 3D",
        "description": "Get ready for an adrenaline-pumping, heart-racing experience with Extreme Run 3D!",
        "category": "Agility",
        "gameMd5": "332fed0d374c4401934cf5b19b7a85b1",
        "tags": ["ball", "endless", "run", "speed"]
    },
    {
        "slug": "mine-and-slash",
        "title": "Mine & Slash",
        "description": "Embark on an epic RPG quest, as you dig and explore your way through a rougelite 3D world.",
        "category": "Adventure",
        "gameMd5": "d9f2085b13234efea9c5ef6bbc1cd998",
        "tags": ["minecraft", "dwarf", "crystal", "dig"]
    },
    {
        "slug": "crystal-connect",
        "title": "Crystal Connect",
        "description": "Discover the enchanting world of Crystal Connect, a captivating game with breathtaking graphics!",
        "category": "Mahjong & Connect",
        "gameMd5": "1e0be8315c8d415aa5f0646f3f3fd577",
        "tags": ["dragon", "matching", "pair", "crystal"]
    },
    {
        "slug": "anaconda-runner",
        "title": "Anaconda Runner",
        "description": "A casual arcade game where size determines your status in the snake kingdom.",
        "category": "Casual",
        "gameMd5": "4ef6c078512f4732acaaeda2d450aff8",
        "tags": ["avoid", "collect", "runner", "snake"]
    },
    {
        "slug": "dynamons-7",
        "title": "Dynamons 7",
        "description": "Embark on a brand new Dynamons adventure with fresh areas to explore!",
        "category": "Adventure",
        "gameMd5": "724fead0a2f8417986c03173ea1ef35e",
        "tags": ["collect", "rpg", "singleplayer"]
    },
    {
        "slug": "bubble-shooter-hd-3",
        "title": "Bubble Shooter HD 3",
        "description": "The legendary bubble shooter returns with fresh new bubbles and exciting features!",
        "category": "Puzzle",
        "gameMd5": "03e358cc3331480795d74a55e4283686",
        "tags": ["bubble", "shooter", "classic"]
    },
    {
        "slug": "beggar-clicker",
        "title": "Beggar Clicker",
        "description": "An addictive idle game where you tap your way to riches from humble beginnings.",
        "category": "Casual",
        "gameMd5": "3e3bcab3e8a44bfda28560c038ff5976",
        "tags": ["idle", "upgrade", "clicker"]
    },
    {
        "slug": "only-up",
        "title": "Only Up",
        "description": "Challenge yourself in this vertical climbing adventure with no checkpoints!",
        "category": "Adventure",
        "gameMd5": "ec5a0aa39f5c4cd19d1e6153de22650d",
        "tags": ["parkour", "challenge", "climbing"]
    },
    {
        "slug": "bubble-letters",
        "title": "Bubble Letters",
        "description": "An immersive word game with vibrant floral backgrounds and tranquil gameplay.",
        "category": "Puzzle",
        "gameMd5": "365b4962c5894454ac7ac9e75ea0fb69",
        "tags": ["words", "flowers", "relaxing"]
    },
    {
        "slug": "color-bump-dancer",
        "title": "Color Bump Dancer",
        "description": "A colorful and casual puzzle game with various classic levels to complete.",
        "category": "Casual",
        "gameMd5": "aba20426b1944f499958439765a580d0",
        "tags": ["color", "dance", "rhythm"]
    },
    {
        "slug": "pop-adventure",
        "title": "Pop Adventure",
        "description": "An addictive bubble shooter offering endless entertainment and relaxation.",
        "category": "Bubble Shooter",
        "gameMd5": "cf19c2cfc240400590a6415ff3256cf9",
        "tags": ["bubble", "shooter", "adventure"]
    },
    {
        "slug": "idle-farm",
        "title": "Idle Farm",
        "description": "Build and manage your own farming empire in this relaxing simulation game.",
        "category": "Simulation",
        "gameMd5": "1253e3f36b984801811d744f4db1125d",
        "tags": ["farm", "tycoon", "idle"]
    },
    {
        "slug": "planet-demolish",
        "title": "Planet Demolish",
        "description": "Explore the mysteries of space in this unique demolition simulation.",
        "category": "Casual",
        "gameMd5": "c857cd8c65914a57abbffc2a4cd5c80b",
        "tags": ["space", "destroy", "physics"]
    },
    {
        "slug": "real-freekick-3d",
        "title": "Real Freekick 3D",
        "description": "Test your soccer skills in intense penalty shootouts and championships.",
        "category": "Sports",
        "gameMd5": "527ae66f4e664fdc8847e7ce952165dc",
        "tags": ["soccer", "sports", "3d"]
    }
]
const GameGrid = () => {
    const [games] = useState(gameDatas);

    return (
        <div className="bg-gray-100 min-h-screen py-8 dark:bg-[#18191a]">
            <div className="max-w-7xl mx-auto px-4 ">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Featured Games</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                    {games.map((game) => (
                        <Link
                            key={game.slug}
                            to={`/games/${game.slug}`}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={`https://img.gamedistribution.com/${game.gameMd5}-512x384.jpg`}
                                    alt={game.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                    {game.category}
                                </div>
                            </div>

                            <div className="p-4 dark:text-white ">
                                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">{game.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-4 dark:text-gray-300">
                                    {game.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {game.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameGrid;