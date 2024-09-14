"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiNinjaHead } from "react-icons/gi";
import { AiOutlineLogout,AiFillFileAdd } from "react-icons/ai";
import { ImPencil2 } from "react-icons/im"
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { FaUserAstronaut } from "react-icons/fa6";

import 'react-toastify/dist/ReactToastify.css';

const AdminLinks = () => {
    const router = useRouter()
    const pathName = usePathname()
    const { status } = useSession();
    const handleSignOut = async () => {
        const result = await signOut({ redirect: false })
        if (result) {
            toast.success("Çıkış yapıldı", {
                onClose: () => {
                    router.push("/");
                }
            })
        }
    }
    return (
        <>
            {status === "unauthenticated" ? (
                <div className=" flex flex-col gap-3 text-sm">
                    <Link href={"/login"} className={`${pathName === "/login" ? "bg-gray-100 dark:bg-gray-600" : ''} hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-all flex gap-3 items-center`}>
                        <GiNinjaHead className="text-2xl text-orange-600 dark:text-orange-500 " />Giriş</Link>
                </div>
            ) : (
                <>
                    <div className=" flex flex-col gap-3 text-sm">
                        <Link href="/write" className={`${pathName === "/write" ? "bg-gray-100 dark:bg-gray-600" : ''} hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-all flex gap-3 items-center`}>
                            <ImPencil2 className="text-xl text-orange-600 dark:text-orange-500 " title='Write' />
                            Yeni Yazı
                        </Link>
                    </div>
                    <div className=" flex flex-col gap-3 text-sm">
                        <Link href="/newproject" className={`${pathName === "/newproject" ? "bg-gray-100 dark:bg-gray-600" : ''} hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-all flex gap-3 items-center`}>
                            <AiFillFileAdd className="text-xl text-orange-600 dark:text-orange-500 " title='Write' />
                            Yeni Proje
                        </Link>
                    </div>
                    <div onClick={handleSignOut} className=" flex flex-col gap-3 text-sm ">
                        <button className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all flex gap-3 items-center">
                            <AiOutlineLogout className="text-2xl  text-orange-600 dark:text-orange-500 " title='Logout' />
                            Çıkış
                        </button>
                    </div>
                </>
            )}
        </>

    )
}

export default AdminLinks