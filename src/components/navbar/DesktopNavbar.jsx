import DarkModeSwitcher from "./DarkModeSwitcher"
import Image from "next/image"
import Link from "next/link"
import me from "../../../public/me.jpg"
import { IoLogoLinkedin } from "react-icons/io5";
import { RiGithubFill, RiInstagramFill } from "react-icons/ri";
import { GiNinjaHead } from "react-icons/gi";

import Navlinks from "./Navlinks";
import AdminLinks from "./AdminLinks";
import Footer from "../footer/Footer";

const DesktopNavbar = () => {
    return (
        <nav className="sticky top-0 left-0 hidden md:flex sm:w-80 md:w-80 min-h-dvh p-5 pb-1 flex-col justify-between gap-4 border-r-2 border-slate-400 dark:border-gray-600  bg-slate-300 dark:bg-gray-900">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <Image src={me} alt="MFU" className="rounded-full w-14 h-14 brightness-110 border-2 " />
                    <div>
                        <h1 className="font-bold ">
                            Muhammed
                           Furkan Uygur
                        </h1>
                        <p className="text-xs text-gray mt-1 ">Frontend Developer</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-sm ">
                    <Navlinks />
                </div>
                <hr className="text-slate-400 dark:text-gray-600  mx-2" />
                <div className=" flex flex-col gap-2 text-sm">
                    <h2 className="px-2 text-gray-500">Socials</h2>
                    <Link href={"https://github.com/mfurkanuygur/"} className="hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-all flex gap-3 items-center" target="_blank" rel="noopener noreferrer">
                        <RiGithubFill className="text-2xl text-orange-600 dark:text-orange-500 " />Github</Link>
                    <Link href={"https://www.linkedin.com/in/mfurkanuygur1/"} className="hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-all flex gap-3 items-center" target="_blank" rel="noopener noreferrer">
                        <IoLogoLinkedin className="text-2xl text-orange-600 dark:text-orange-500 " />Linkedin</Link>
                    <Link href={"https://www.instagram.com/mfrknu/"} className="hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-all flex gap-3 items-center" target="_blank" rel="noopener noreferrer">
                        <RiInstagramFill className="text-2xl text-orange-600 dark:text-orange-500 " />Instagram</Link>
                </div>
                <hr className="text-slate-400 dark:text-gray-600 mx-2" />
                <AdminLinks />
            </div>
            <div className="flex flex-col gap-1 w-full">
                <DarkModeSwitcher />
                <Footer />
            </div>
        </nav>
    )
}

export default DesktopNavbar