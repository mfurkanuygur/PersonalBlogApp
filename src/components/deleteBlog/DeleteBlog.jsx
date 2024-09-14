"use client"
import { deleteOneBlog } from '@/requests/request'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { IoMdTrash } from "react-icons/io";
const Deleteblog = ({ slug }) => {
    const { data, status } = useSession()
    const router = useRouter()
    const handleDeleteBlog = async () => {
        if (status === 'authenticated') {
            try {
                deleteOneBlog(slug).then(() => {
                    toast.success("Silindi", {
                        onClose: () => {
                            router.push("/blogs");
                        }
                    })
                })
            } catch (error) {
                toast.error("Blog silinirken hata oluştu:", error)
            }
        } else {
            toast.warning("Admin değilseniz silemezsiniz")
        }
    };
    return (
        <>
            {
                data &&
                <button onClick={handleDeleteBlog} className='px-2 py-1 text-sm rounded-lg border-2 border-red-600  hover:bg-red-600 hover:text-white transition-all'>
                    <IoMdTrash className='text-2xl'/>
                </button>
                ||
                null
            }
        </>
    )
}

export default Deleteblog