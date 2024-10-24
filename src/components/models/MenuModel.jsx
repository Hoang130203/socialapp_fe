import { Icon, IconButton, Modal } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
function MenuModel({ open,
    setOpen, }) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    }
    return (
        <>
            {
                open &&
                <div className="absolute bottom-[-50px] right-[-20px] w-[250px] bg-white  rounded-md shadow-2xl shadow-slate-300 dark:shadow-slate-700 dark:bg-slate-700 dark:text-white" >
                    <div className="flex justify-center">
                        <div onClick={handleLogout}
                            className="flex justify-start items-center w-full p-2 gap-2 hover:bg-slate-100 dark:hover:bg-slate-500 duration-300 rounded-md">
                            <div className="rounded-full bg-slate-200 dark:bg-slate-600 p-[6px] flex justify-center items-center">
                                <LogoutIcon fontSize="14"></LogoutIcon>
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 500 }}>Đăng xuất</div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default MenuModel;