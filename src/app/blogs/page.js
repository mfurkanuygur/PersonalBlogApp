"use client"

import { countOfBlogs, getAllBlogs } from "@/requests/request";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import sanitizeHtml from 'sanitize-html';
import { GoHeart } from "react-icons/go";
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from "react-icons/bs";
import Loading from "@/components/loading/Loading";
import Notfound from "@/components/notFound/Notfound";
import { useBlogStore, useProjectStore } from "@/store/store";
import { usePathname } from "next/navigation";

const Blogs = () => {
  const pathname = usePathname()
  const [blogs, setBlogs] = useState()
  const [totalBlogCounts, setTotalBlogCounts] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { blogPageNumber, blogsPerPage, increaseBlogPageNumber, decreaseBlogPageNumber, increaseBlogsPerPage, decreaseBlogsPerPage } = useBlogStore()
  const { resetProjectPageNumber, resetProjectsPerPage } = useProjectStore()
  
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await getAllBlogs(blogsPerPage);
      const countData = await countOfBlogs();
      setBlogs(blogsData);
      setTotalBlogCounts(countData);
    };
    fetchBlogs();
  }, [blogsPerPage, blogPageNumber])

  const prevPage = () => {
    decreaseBlogPageNumber()
    decreaseBlogsPerPage()
    setBlogs([])
  };

  const nextPage = () => {
    increaseBlogPageNumber()
    increaseBlogsPerPage()
    setBlogs([])
  };
  useEffect(() => {
    if (!pathname == "/projects" || !pathname.includes("/projects")) {
      resetProjectPageNumber()
      resetProjectsPerPage()
    }
  }, [pathname])
  return (
    <main className=" w-full flex flex-col gap-4 items-start lg:justify-start max-w-md md:max-w-3xl md:px-14  mx-auto p-6 pt-4 ">
      <div className="sticky w-full top-0 z-20 left-0 pb-3 bg-gray-100 dark:bg-gray-950 md:p-0 md:static ">
        <div className=" p-3 bg-slate-300 dark:bg-gray-950  md:bg-transparent md:p-0 border-b-4 border-slate-500 dark:border-gray-600 md:border-none flex items-center justify-between w-full rounded-lg">
          <h1 className='text-3xl font-bold text-start w-full'>Bloglar</h1>
          {
            blogs?.length >= 1 &&
            <div className="w-full overflow-hidden flex justify-end">
              <div className="animate-open-card w-fit flex  items-center justify-between gap-3">
                <button disabled={blogPageNumber == 1 ? true : null}
                  onClick={prevPage}> <BsFillArrowLeftSquareFill className={`${(blogPageNumber == 1) ? "text-gray-500 text-3xl" : "text-orange-600 dark:text-orange-500"} text-3xl  cursor-pointer`} title="Önceki Sayfa" /></button>
                <p className="font-bold text-xl">{blogPageNumber}</p>
                <button disabled={blogPageNumber >= Math.ceil(totalBlogCounts / 3)}
                  onClick={nextPage}><BsFillArrowRightSquareFill className={`${(blogPageNumber >= Math.ceil(totalBlogCounts / 3)) ? "text-gray-500 " : "text-orange-600 dark:text-orange-500"} text-3xl  cursor-pointer`} title="Sonraki Sayfa" /></button>
              </div>
            </div>
          }
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center gap-4">
        {
          blogs && blogs?.length >= 1 &&
          blogs?.map(blog => (
            <div key={blog.id} className="overflow-hidden w-full">
              <div className="font-light animate-open-card p-3 w-full rounded-lg flex flex-col justify-stretch items-stretch lg:flex-row  gap-4 bg-slate-300 dark:bg-gray-900">
                <div className="relative  min-w-72  w-full lg:max-w-72  h-48 lg:h-44 "><Image src={blog?.image} alt={blog?.title} fill className="rounded-lg" /></div>
                <div className="w-full flex flex-col gap-2 justify-between">
                  <div className="w-full flex flex-col gap-1 justify-start items-start">
                    <div className="flex items-end justify-between w-full">
                      <div className="flex flex-col justify-between items-start w-full">
                        <p className="text-2xl capitalize font-bold">{blog.title}</p>
                        <p className="text-xs">{blog?.date.slice(0, 10).split("-").reverse().join(".")}</p>
                      </div>
                      <div className="flex gap-1 items-center justify-center">
                        <p className="font-bold text-xs">{blog?.likes}</p>
                        <GoHeart className="text-xl text-orange-600" />
                      </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.text) }} className=' line-clamp-4 text-justify text-sm max-w-xs ' />
                  </div>
                  <Link href={`/blogs/${blog.id}_${blog.slug}`} className="h-9 lg:px-4 py-1 rounded-lg w-full text-sm font-semibold flex gap-2 items-center justify-center border-2 border-orange-600  hover:bg-orange-600 hover:text-slate-100 transition-all">
                    Oku
                  </Link>
                </div>
              </div>
            </div>
          ))
          || <Loading />

        }
      </div>

    </main>
  )
}

export default Blogs