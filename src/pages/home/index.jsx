import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import Messenger from '../../components/messenger/Messenger';
import NavBar from '../../components/NavBar';
import MainContent from '../../components/MainContent';
import PostForm from '../../components/PostForm';
import Feed from '../../components/Feed';
import NotUserMenu from '../../components/NotUserMenu';
import Room from '../../components/Room';
import RightMenu from '../../components/RightMenu';
import LeftMenu from '../../components/LeftMenu';
function Home() {
    const [user, setUser] = useState(true);
    const [isMessenger, setIsMessenger] = useState(false);

    useEffect(() => {
        if (!user) {
            setIsMessenger(false);
        }
    }, [user]);
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-[#f7f7f7] dark:bg-[#18191a]  w-full lg:w-2/3 "
            >
                <div className="  pt-32 lg:pt-16 px-2 ">
                    {isMessenger ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center justify-center h-auto min-h-screen bg-gray-100 text-gray-800 dark:bg-[#28282B]"
                        >
                            <Messenger />
                        </motion.div>
                    ) : (
                        <>
                            {user && (
                                <>
                                    <MainContent />
                                    <PostForm isShow={true} />
                                </>
                            )}
                            <Feed />
                        </>
                    )}
                </div>
            </motion.div>
        </>
    )
}

export default Home
