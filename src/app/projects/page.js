"use client"
import { getAllProjects } from "@/requests/request"
import { countOfProjects } from "@/requests/request";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import sanitizeHtml from 'sanitize-html';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from "react-icons/bs";
import Loading from "@/components/loading/Loading";
import { FaSearch } from "react-icons/fa";
import { RiGithubFill } from "react-icons/ri";
import { SiSitepoint } from "react-icons/si";
import Notfound from "@/components/notFound/Notfound";
import { usePathname } from "next/navigation";
import { useBlogStore, useProjectStore } from "@/store/store";
const Projects = () => {
    const [projects, setProjects] = useState()
    const [totalProjectCounts, setTotalProjectCounts] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()
    const { resetBlogPageNumber, resetBlogsPerPage } = useBlogStore()
    const { projectPageNumber, projectsPerPage, increaseProjectPageNumber, decreaseProjectPageNumber, increaseProjectsPerPage, decreaseProjectsPerPage } = useProjectStore()
  
    useEffect(() => {
        const fetchProjects = async () => {
            // setIsLoading(true);
            const projectsData = await getAllProjects(projectsPerPage);
            const countData = await countOfProjects();
            setProjects(projectsData);
            setTotalProjectCounts(countData);
            // setIsLoading(false);
        };
        fetchProjects();
    }, [projectsPerPage, projectPageNumber])

    const prevPage = () => {
        decreaseProjectPageNumber()
        decreaseProjectsPerPage()
        setProjects([])
    };

    const nextPage = () => {
        increaseProjectPageNumber()
        increaseProjectsPerPage()
        setProjects([])
    };
    useEffect(() => {
        if (!pathname == "/blogs" || !pathname.includes("/blogs")) {
            resetBlogPageNumber()
            resetBlogsPerPage()
        }
    }, [pathname])
    return (
        <main className=" w-full flex flex-col gap-4 items-start lg:justify-start max-w-md md:max-w-3xl md:px-12  mx-auto p-6 pt-4">
            <div className="sticky w-full top-0 z-20 left-0 pb-3 bg-gray-100 dark:bg-gray-950 md:p-0 md:static">
                <div className=" p-3 bg-slate-300 dark:bg-gray-900  md:bg-transparent md:dark:bg-transparent md:p-0 border-b-4 border-slate-500 dark:border-gray-600 md:border-none flex items-center justify-between w-full rounded-lg">
                    <h1 className='text-3xl font-bold text-start w-full'>Projeler</h1>
                    {
                        projects && projects?.length > 0 &&
                        <div className="overflow-hidden flex justify-end w-full">
                            <div className="animate-open-card w-fit flex  items-center justify-between gap-3">
                                <button disabled={projectPageNumber == 1 ? true : null}
                                    onClick={prevPage}> <BsFillArrowLeftSquareFill className={`${(projectPageNumber == 1) ? "text-gray-500 text-3xl" : "text-orange-600 dark:text-orange-500"} text-3xl  cursor-pointer`} title="Önceki Sayfa" /></button>
                                <p className="font-bold text-xl">{projectPageNumber}</p>
                                <button disabled={projectPageNumber >= Math.ceil(totalProjectCounts / 3)}
                                    onClick={nextPage}><BsFillArrowRightSquareFill className={`${(projectPageNumber >= Math.ceil(totalProjectCounts / 3)) ? "text-gray-500 " : "text-orange-600 dark:text-orange-500"} text-3xl  cursor-pointer`} title="Sonraki Sayfa" /></button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center gap-3">
                {
                    projects?.length > 0 &&
                    projects?.map(project => (
                        <div key={project.id} className="overflow-hidden w-full">
                            <div className="font-light animate-open-card p-3 w-full rounded-lg flex flex-col justify-stretch items-stretch lg:flex-row  gap-4 bg-slate-300 dark:bg-gray-900">
                                <div className="relative  min-w-72  w-full lg:max-w-72  h-48 lg:h-44 "><Image src={project?.image} alt={project?.title} fill className="rounded-lg" /></div>
                                <div className="w-full flex flex-col gap-2 justify-between">
                                    <div className="w-full flex flex-col gap-2 justify-start items-start">
                                        <p className="text-2xl capitalize font-bold">{project.title}</p>
                                        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.text) }} className=' line-clamp-4 text-justify text-sm ' />
                                    </div>
                                    <div className="flex w-full justify-center lg:justify-end items-center gap-3">
                                        {
                                            project.demo &&
                                            <Link href={`${project.demo}`} className="h-9 lg:px-4 py-1 rounded-lg w-full text-sm font-semibold flex gap-2 items-center justify-center border-2 border-orange-600 text-center hover:bg-orange-600 hover:text-slate-100 transition-all" target="_blank" rel="noopener noreferrer">
                                                <SiSitepoint className="text-xl" />
                                                Demo
                                            </Link>
                                        }
                                        <Link href={`${project.link}`} className="h-9 lg:px-4 py-1 rounded-lg w-full text-sm font-semibold flex gap-2 items-center justify-center border-2 border-orange-600 hover:bg-orange-600 hover:text-slate-100 transition-all" target="_blank" rel="noopener noreferrer">
                                            <RiGithubFill className="text-2xl" />
                                            Github
                                        </Link>
                                        <Link href={`/projects/${project.id}_${project.slug}`} className="h-9 lg:px-4 py-1 rounded-lg w-full text-sm font-semibold flex gap-2 items-center justify-center border-2 border-orange-600  hover:bg-orange-600 hover:text-slate-100 transition-all">
                                            <FaSearch className="text-xl" />
                                            İncele
                                        </Link>
                                    </div>
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

export default Projects





