"use client"
import { useEffect, useState } from "react";
import DeleteProject from "@/components/deleteProject/DeleteProject";
import Loading from "@/components/loading/Loading";
import Image from "next/image"
import Link from "next/link";
import sanitizeHtml from 'sanitize-html';
import { RiGithubFill } from "react-icons/ri";
import { SiSitepoint } from "react-icons/si";
import { getOneProject } from "@/requests/request"
import EditProject from "@/components/editProject/EditProject";
import { StyledHtml } from "../../../styledHtml/styledHtml.js";

const Page = ({ params }) => {
    const projectID = params.slug.split("_")[0]
    const [project, setProject] = useState()
    useEffect(() => {
        getOneProject(projectID).then(data => setProject(data))
    }, [])
    return (
        <main className=' w-full flex flex-col gap-4 items-start lg:justify-start max-w-md md:max-w-3xl md:px-12  mx-auto p-6 bg-slate-300 dark:bg-gray-900  '>
            {
                project &&
                <div className="animate-open-card w-full flex flex-col gap-3">
                    <div className="relative w-full h-56 md:h-72 lg:h-96"><Image src={project?.image} alt={project?.title} fill className="rounded-lg" /></div>
                    <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-3xl font-bold capitalize ">{project?.title}</h1>
                            <div className="flex items-center gap-1">
                                <EditProject slug={projectID} />
                                <DeleteProject slug={projectID} />
                            </div>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <div className={`${project.status === "completed" ? "text-orange-600" : "text-slate-500"} text-xs capitalize mt-2 `}>{project?.status}</div>
                            <div className="flex gap-3 items-center">
                                {
                                    project.demo &&
                                    <Link title="Demo" href={`${project.demo}`} className="p-1 rounded-full w-full border-orange-600 text-center hover:bg-orange-600 hover:text-slate-100 transition-all" target="_blank" rel="noopener noreferrer">
                                        <SiSitepoint className="text-2xl" />
                                    </Link>
                                }
                                <Link href={`${project.link}`} title="Github" target="_blank" rel="noopener noreferrer">
                                    <RiGithubFill className="text-4xl hover:text-orange-600 dark:text-slate-200 dark:hover:text-orange-600 transition-all" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <StyledHtml dangerouslySetInnerHTML={{ __html: sanitizeHtml(project?.text) }} className=' text-justify ' />
                    <div className="w-full grid grid-cols-3 lg:grid-cols-5 gap-3 justify-between ">
                        {project?.techs.trim().split("\n").map((tech, i) => (
                            <span key={i} className="h-11 w-full flex items-center justify-center bg-orange-600 font-semibold px-4 py-2 rounded-lg text-xs text-center">{tech}</span>
                        ))}
                    </div>
                </div> ||
                <Loading />
            }
        </main>
    )
}

export default Page