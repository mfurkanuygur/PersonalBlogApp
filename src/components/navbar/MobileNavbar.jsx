"use client"
import Image from "next/image"
import me from "../../../public/me.jpg"
import Link from "next/link"
import DarkModeSwitcher from "./DarkModeSwitcher"
import { useEffect, useState } from "react"
import { TiThMenu } from "react-icons/ti";
import { IoLogoLinkedin } from "react-icons/io5";
import { RiGithubFill, RiInstagramFill } from "react-icons/ri";
import { GiNinjaHead } from "react-icons/gi";
import Navlinks from "./Navlinks"
import AdminLinks from "./AdminLinks"
import { usePathname } from "next/navigation"

const MobileNavbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false);
    const pathname = usePathname()
    useEffect(() => {
        setIsAnimating(!isAnimating)
        if (isMenuOpen) {
            setTimeout(() => {
                setIsMenuOpen(!isMenuOpen);
            }, 600);
        }

    }, [pathname]);

    const handleMenuToggle = () => {
        if (isMenuOpen) {
            setIsAnimating(false)
            setTimeout(() => {
                setIsMenuOpen(!isMenuOpen);
            }, 600);
        } else {
            setIsAnimating(true)
            setIsMenuOpen(!isMenuOpen);
        }
    };
    return (
        <nav className="flex flex-col md:hidden  min-h-screen">
            <div className="fixed bottom-3 right-3 p-3 text-xs font-bold text-gray-950 bg-orange-600 rounded-full z-50 flex gap-2 items-center cursor-pointer"
                //  onClick={() => setIsMenuOpen(!isMenuOpen)}>
                onClick={handleMenuToggle}>
                <TiThMenu className="text-2xl" />
                {/* Menu */}
            </div>
            {isMenuOpen &&
                <div className={`${isAnimating ? "animate-open-mobile-navbar" : 'animate-close-mobile-navbar'} 
                fixed min-h-screen w-dvw  z-40 bg-slate-300 dark:bg-gray-900 p-5 flex flex-col justify-between`} >
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between w-full items-center">
                            <div className="flex items-center gap-3">
                                <Image src={me} alt="MFU" className="rounded-full w-14 h-14 brightness-110 border-2 " />
                                <div>
                                    <h1 className="">Muhammed Furkan Uygur</h1>
                                    <p className="text-xs text-gray ">Frontend Developer</p>
                                </div>
                            </div>
                            <DarkModeSwitcher />
                        </div>

                        <div className="flex flex-col gap-2 text-sm ">
                            <Navlinks />
                        </div>
                        <hr className="text-slate-400 dark:text-gray-600 mx-2" />
                        <div className=" flex flex-col gap-2 text-sm">
                            <h2 className="px-2 text-gray-500">Socials</h2>
                            <Link href={"https://github.com/mfurkanuygur/"} className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all flex gap-3 items-center" target="_blank" rel="noopener noreferrer">
                                <RiGithubFill className="text-2xl text-orange-600 dark:text-orange-500 " />Github</Link>
                            <Link href={"https://www.linkedin.com/in/mfurkanuygur1/"} className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all flex gap-3 items-center" target="_blank" rel="noopener noreferrer">
                                <IoLogoLinkedin className="text-2xl text-orange-600 dark:text-orange-500 " />Linkedin</Link>
                            <Link href={"https://www.instagram.com/mfrknu/"} className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all flex gap-3 items-center" target="_blank" rel="noopener noreferrer">
                                <RiInstagramFill className="text-2xl text-orange-600 dark:text-orange-500 " />Instagram</Link>
                        </div>
                        <hr className="text-slate-400 dark:text-gray-600 mx-2" />
                        <AdminLinks />
                    </div>
                </div>

            }
        </nav>
    )
}

export default MobileNavbar