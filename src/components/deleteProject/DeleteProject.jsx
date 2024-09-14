"use client"
import { deleteOneBlog, deleteOneProject } from '@/requests/request'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { IoMdTrash } from "react-icons/io";
const DeleteProject = ({slug}) => {
    const { data, status } = useSession()
    const router = useRouter()
    const handleDeleteProject = async () => {
        if (status === 'authenticated') {
            try {
                deleteOneProject(slug).then(() => {
                    toast.success("Silindi", {
                        onClose: () => {
                            router.push("/projects");
                        }
                    })
                })
            } catch (error) {
                toast.error("Proje silinirken hata oluştu:", error)
            }
        } else {
            toast.warning("Admin değilseniz silemezsiniz")
        }
    };
    return (
        <>
            {
                data &&
                <button onClick={handleDeleteProject} className='px-2 py-1 text-sm rounded-lg border-2 border-red-600  hover:bg-red-600 hover:text-white transition-all'>
                    <IoMdTrash className='text-2xl'/>
                </button>
                ||
                null
            }
        </>
    )
}

export default DeleteProject