'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkModeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className=" border-2 rounded-full md:border-none md:rounded-none">
            <button
                className=' text-sm w-full rounded-full flex items-center gap-3 p-2 lg:hover:bg-gray-100 lg:dark:hover:bg-gray-800 transition-all '
                onClick={() => setTheme(theme !== "dark" ? "dark" : "light")}>
                {theme !== "dark" ? <MdDarkMode className='text-2xl  text-orange-600 dark:text-orange-500' /> : <MdLightMode className='text-2xl  text-orange-600 dark:text-orange-500' />}
                <div className='hidden md:block'>{theme !== "dark" ? "Koyu" : "Açık"} Mod</div>
            </button>
        </div>
    );
}

export default DarkModeSwitcher