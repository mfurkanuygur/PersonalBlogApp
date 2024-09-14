"use client"

import { useEffect, useMemo, useState } from "react"
import { editOneBlog, editOneProject, getOneBlog, getOneProject } from "@/requests/request"
import { app } from '@/utils/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, } from "firebase/storage";
import dynamic from "next/dynamic"
import { CiImageOn } from "react-icons/ci"
import { toast } from "react-toastify"
import "react-quill/dist/quill.bubble.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>
});

const EditProject = ({ params }) => {
    const projectId = params.slug
    const { data, status } = useSession();
    const router = useRouter()
    const [edit, setEdit] = useState()
    const [editTitle, setEditTitle] = useState("")
    const [editFile, setEditFile] = useState("")
    const [editMedia, setEditMedia] = useState("")
    const [editValue, setEditValue] = useState("");
    const [editLink, setEditLink] = useState("");
    const [editTechs, setEditTechs] = useState("");
    const [editDemo, setEditDemo] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [previousFile, setPreviousFile] = useState("");

    useEffect(() => {
        getOneProject(projectId).then(data => {
            setEdit(data);
            setEditTitle(data.title);
            setEditMedia(data.image);
            setEditValue(data.text);
            setEditLink(data.link);
            setEditTechs(data.techs);
            setEditDemo(data.demo);
            setEditStatus(data.status)
            setPreviousFile(data.image);

        })
    }, [])

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    ["bold", "italic", "underline", 'strike', "blockquote"],
                    [{ color: [] }],
                    [{ background: [] }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                    ],
                    ["link", "video"],
                    [{ align: [] }],
                    ['code-block'],
                    ["clean"],
                ],
            },
            clipboard: {
                matchVisual: true,
            },
        }),
    );

    const formats = [
        ,
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "video",
        "color",
        "background",
        "clean",
        'align',
        'code-block',

    ];
    useEffect(() => {
        if (editFile) {
            const upload = () => {
                const name = new Date().getTime() + editFile.name;
                const storage = getStorage(app);
                const storageRef = ref(storage, name);
                const uploadTask = uploadBytesResumable(storageRef, editFile);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if (progress === 0) {
                            toast.info("Upload is starting");
                        } else if (progress === 100) {
                            toast.info(`Upload is ${progress}% done`);
                        }
                    },
                    (error) => {
                        toast.error(`Upload failed: ${error.message}`);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setEditMedia(downloadURL);
                            if (previousFile) {
                                const storage = getStorage(app);
                                const previousFileRef = ref(storage, previousFile);
                                deleteObject(previousFileRef).then(() => {
                                    toast.success("Önceki resim silindi!");
                                }).catch((error) => {
                                    toast.error(`Önceki resim silinirken hata: ${error.message}`);
                                });
                            }
                        });
                    }
                );
            };
            upload();
        }
    }, [editFile, previousFile]);

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    const handleUpdateProject = () => {
        if (editValue !== "" && editTitle !== "") {
            if (data && data.user) {
                const editedBlog = {
                    title: editTitle,
                    link: editLink,
                    demo: editDemo,
                    text: editValue,
                    image: editMedia,
                    slug: slugify(editTitle),
                    techs: editTechs,
                    status: editStatus
                }
                editOneProject(projectId, editedBlog)
                toast.success("Güncellendi", {
                    onClose: () => {
                        router.push("/projects");
                    }
                })
            }
            else {
                toast.error("Admin değilsiniz!", {
                    onClose: () => {
                        router.push("/projects");
                    }
                })
            }
        }
        else {
            toast.warning("Tüm alanları doldurman gerek!")
        }
    }
    const handleProjectState = (e) => {
        setEditStatus(e.target.value)
    }
    return (
        <main className=' w-full flex flex-col gap-4 items-start justify-start max-w-xl md:max-w-2xl md:px-12 mx-auto p-6'>
            <div className='w-full flex flex-col justify-center items-center gap-4 '>
                <div className="flex justify-between items-center w-full">
                    <h1 className='text-3xl capitalize text-start w-full'>Edit <strong className="text-2xl">{editTitle}</strong></h1>
                    <button onClick={() => handleUpdateProject()} className='px-4 py-2 rounded-lg text-sm border-2 border-orange-600 hover:bg-orange-600 transition-all hover:text-slate-100'>Güncelle</button>
                </div>

                <input type="text" placeholder='Yeni proje başlığı...' className='w-full outline-none border-2 border-slate-400 py-2 px-3 rounded-lg'
                    value={editTitle} onChange={(e) => { setEditTitle(e.target.value) }} />
                <input type="text" placeholder='Yeni proje linki...' className='w-full outline-none border-2 border-slate-400 py-2 px-3 rounded-lg'
                    value={editLink} onChange={(e) => { setEditLink(e.target.value) }} />
                <input type="text" placeholder='Yeni proje demo bağlantısı...' className='w-full outline-none border-2 border-slate-400 py-2 px-3 rounded-lg'
                    value={editDemo} onChange={(e) => { setEditDemo(e.target.value) }} />
                <div className='w-full flex flex-col-reverse lg:flex-row items-start justify-between lg:items-end  gap-4'>
                    <div className="w-full flex flex-col items-start justify-start gap-3">
                        <p>Proje Durumu:</p>
                        <div className="flex flex-row md:flex-col justify-center items-start gap-3">
                            <div className="flex items-center gap-2 ">
                                <input type="radio" value="in development" checked={editStatus === "in development"} id="in development" name="projectState" className="cursor-pointer" onChange={(e) => handleProjectState(e)} />
                                <label htmlFor="in development" className="text-sm capitalize cursor-pointer">In development</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="radio" value="completed" id="completed" checked={editStatus === "completed"} name="projectState" className="cursor-pointer" onChange={(e) => handleProjectState(e)} />
                                <label htmlFor="completed" className="text-sm capitalize cursor-pointer">completed</label>
                            </div>
                        </div>
                    </div>
                    <div className=' '>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setEditFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                        <div className='flex flex-col justify-start gap-1'>
                            <button className='hover:text-orange-600'>
                                <label htmlFor="image">
                                    <CiImageOn className="text-3xl cursor-pointer" title='Image' />
                                </label>
                            </button>
                            <p className='line-clamp-2 max-w-60' title={editMedia}>{editMedia}</p>
                        </div>
                    </div>
                </div>
                <ReactQuill formats={formats} modules={modules} value={editValue} onChange={setEditValue} theme="bubble" className='w-full min-h-96  dark:bg-slate-400 dark:text-black border-2 border-slate-400 dark:border-slate-800 rounded-lg ' placeholder="Tell your story..." />
            </div>
        </main>
    )
}

export default EditProject