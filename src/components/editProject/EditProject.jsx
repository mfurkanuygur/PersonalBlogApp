"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdModeEditOutline } from "react-icons/md";
const EditProject = ({ slug }) => {
    const { data, status } = useSession()
    const router = useRouter()
    return (
        <>
            {
                data &&
                <Link href={`/editproject/${slug}`} className='px-2 py-1 text-sm rounded-lg border-2 border-green-600  hover:bg-green-600 hover:text-white transition-all'>
                    <MdModeEditOutline className="text-2xl"/>
                </Link>
                ||
                null
            }
        </>
    )
}

export default EditProject

