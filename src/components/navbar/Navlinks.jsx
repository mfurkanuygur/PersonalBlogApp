"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TbHexagonLetterBFilled } from "react-icons/tb";
import { IoHome, IoMailOpen } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";

const links = [
    {
        icon: <AiFillProduct className="text-2xl text-orange-600 dark:text-orange-500 " />,
        name: "Projeler",
        path: "/projects"
    },

    {
        icon: <IoMailOpen className="text-2xl text-orange-600 dark:text-orange-500 " />,
        name: "İletişim",
        path: "/contact"
    }
]
const Navlinks = () => {
    const pathName = usePathname()
    return (
        <>
            <Link href={"/"} className={`${pathName === "/" ? "bg-gray-100 dark:bg-gray-600" : ''} hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-all flex gap-3 items-center`}>
                <IoHome className="text-2xl text-orange-600 dark:text-orange-500 " />
                <p className='capitalize'>Anasayfa</p>
            </Link>
            {
                links.slice(0,1).map((link, i) => (
                    <Link key={i} href={link.path} className={`${pathName.includes(link.path) ? "bg-gray-100 dark:bg-gray-600" : ''} hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-all flex gap-3 items-center`}>
                        {link.icon}
                        <p className='capitalize'>{link.name}</p>
                    </Link>
                ))
            }
            <Link href={"/blogs"} className={`${pathName.includes("/blogs") ? "bg-gray-100 dark:bg-gray-600" : ''} hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-all flex gap-3 items-center`}>
                <p className="relative w-min flex gap-3 items-center">
                    <span className="absolute -right-4 -top-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
                    </span>
                    <TbHexagonLetterBFilled className="text-2xl text-orange-600 dark:text-orange-500 " />
                    Bloglar
                </p>
            </Link>
            {
                links.slice(1,2).map((link, i) => (
                    <Link key={i} href={link.path} className={`${pathName.includes(link.path) ? "bg-gray-100 dark:bg-gray-600" : ''} hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-all flex gap-3 items-center`}>
                        {link.icon}
                        <p className='capitalize'>{link.name}</p>
                    </Link>
                ))
            }
        </>
    )
}

export default Navlinks