"use client"
import Deleteblog from "@/components/deleteBlog/DeleteBlog";
import EditBlog from "@/components/editBlog/EditBlog";
import LikeBlog from "@/components/likeBlog/LikeBlog";
import Loading from "@/components/loading/Loading";
import { getOneBlog } from "@/requests/request"
import Image from "next/image"
import { useEffect, useState } from "react";
import sanitizeHtml from 'sanitize-html';
import { StyledHtml } from "../../../styledHtml/styledHtml.js";

const Page = ({ params }) => {
    const blogID = params.slug.split("_")[0]
    const [blog, setBlog] = useState()
    useEffect(() => {
        getOneBlog(blogID).then(data => setBlog(data))
    }, [])

    return (
        <main className=' w-full flex flex-col gap-4 items-start lg:justify-start max-w-md md:max-w-3xl md:px-12  mx-auto p-6 bg-slate-300 dark:bg-gray-900  '>
            {
                blog &&
                <div className="animate-open-card w-full flex flex-col gap-3">
                    <div className="relative w-full h-56 md:h-72 lg:h-96"><Image src={blog?.image} alt={blog?.title} fill className="rounded-lg" /></div>
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-3xl font-bold capitalize ">{blog?.title}</h1>
                        <div className="flex gap-1 items-center">
                            <EditBlog slug={blogID} />
                            <Deleteblog slug={blogID} />
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center '>
                        <p className='text-xs'>{blog?.date.slice(0, 10).split("-").reverse().join(".")}</p>
                        <LikeBlog slug={blogID} />
                    </div>
                    <StyledHtml dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog?.text) }} className=' text-justify ' />
                </div> ||
                <Loading />

            }
        </main>
    )
}

export default Page