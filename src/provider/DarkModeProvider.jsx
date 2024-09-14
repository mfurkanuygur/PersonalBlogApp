"use client"
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

const DarkModeProvider = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return <>{children}</>
    }
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}

export default DarkModeProvider