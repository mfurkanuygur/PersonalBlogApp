"use client"
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const { data, status } = useSession()

    if (status === "loading") {
        return <div>Loading...</div>
    }

    // if (status === "authenticated") {
    //     router.push("/blog");
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (result.ok) {
            toast.success("Giriş yapıldı", {
                onClose: () => {
                    router.push("/");
                }
            })
        }
        if (result.error) {
            toast.error("Bilgileriniz hatalı veya eksik!")
        }
    };

    return (
        <main className=" w-full flex flex-col gap-4 items-start justify-center max-w-md md:max-w-xl md:px-12  mx-auto p-6  ">
           <div className='w-full overflow-hidden'>
                <div className='animate-open-card border-2 border-slate-400 dark:border-gray-700 p-8 lg:p-16 rounded-lg w-full flex flex-col gap-6 bg-slate-300 dark:bg-gray-900'>
                    <h1 className='capitalize text-3xl text-center flex flex-col-reverse'>hoşgeldin<span className='font-inspiration font-bold text-6xl'>MFU</span></h1>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4 '>
                        <div className='flex flex-col justify-center items-start gap-1 w-full'>
                            <label htmlFor="email">Email:</label>
                            <input
                                id='email'
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                className='w-full p-2 rounded-lg dark:bg-slate-50 outline-none text-black'
                            />
                        </div>
                        <div className='flex flex-col justify-center items-start gap-1 w-full'>
                            <label htmlFor="password">Password:</label>
                            <input
                                id='password'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full p-2 rounded-lg dark:bg-slate-50 outline-none text-black'
                            />
                        </div>
                        <button type="submit" className='px-4 py-2  rounded-xl w-full text-orange-600 hover:text-slate-100 border-2 border-orange-600 hover:bg-orange-600 transition-all'>Giriş Yap</button>
                    </form>
                </div>
           </div>
        </main>
    )
}

export default Login