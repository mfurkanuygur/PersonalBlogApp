"use client"
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CiImageOn } from "react-icons/ci";
import { app } from '@/utils/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css';
import "react-quill/dist/quill.bubble.css";
import { postNewProject } from "@/requests/request";

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

const NewProject = () => {
  const { data, status } = useSession();
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [demo, setDemo] = useState("");
  const [techs, setTechs] = useState("");
  const [projectState, setProjectState] = useState("");
  const router = useRouter()
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
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress == 0 ?
            toast.info("Upload is start") : null
          progress == 100 ?
            toast.info("Upload is " + progress + "% done") : null
        },
        (error) => {
          toast.info(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    }
    file && upload();
  }, [file])
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const handlePublishProject = async () => {

    if (file && media !== "" && value.trim() !== "" && title.trim() !== "" && techs.trim() !== "" && projectState.trim() !== "") {
      if (data && data.user) {
        if (demo?.trim() !== "") {
          setDemo(null)
        }
        const newProject = {
          title: title,
          link: link,
          text: value,
          techs: techs,
          demo: demo,
          status: projectState,
          image: media,
          slug: slugify(title),
          date: new Date().toISOString(),
        }
        postNewProject(newProject)
        toast.success("Eklendi", {
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
    setProjectState(e.target.value)
  }
  return (
    <main className='w-full flex flex-col gap-4 items-start justify-start max-w-xl md:max-w-2xl md:px-12 mx-auto p-6 '>
      <div className='w-full flex flex-col justify-center items-center gap-4 '>
        <div className="w-full flex justify-between items-center">
          <h1 className='text-3xl capitalize text-start w-fit'>Yeni Proje</h1>
          <button onClick={() => handlePublishProject()} className='px-4 py-2 rounded-lg text-sm border-2 border-orange-600 hover:bg-orange-600 transition-all hover:text-slate-100'>Proje Ekle</button>
        </div>
        <input type="text" placeholder='Proje adı...' className='w-full outline-none border-2 border-slate-400 py-2 px-3 rounded-lg' onChange={(e) => { setTitle(e.target.value) }} />
        <input type="text" placeholder='Proje linki...' className='w-full outline-none border-2 border-slate-400 py-2 px-3 rounded-lg' onChange={(e) => { setLink(e.target.value) }} />
        <input type="text" placeholder='Proje demosu...' className='w-full outline-none border-2 border-slate-400 py-2 px-3 rounded-lg' onChange={(e) => { setDemo(e.target.value) }} />

        <div className='w-full flex flex-col lg:flex-row justify-between items-center  gap-4'>
          <div className='w-full flex flex-col md:flex-row justify-start items-center  gap-4 '>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
            <div className="w-full flex flex-col-reverse md:flex-row items-end gap-3 ">
              <div className="w-full flex flex-col items-start justify-start gap-3">
                <p>Proje Durumu:</p>
                <div className="flex items-start md:flex-col lg:flex-row gap-3">
                  <div className="flex items-center gap-2 ">
                    <input type="radio" value="in development" id="in development" name="projectState" className="cursor-pointer" onChange={(e) => handleProjectState(e)} />
                    <label htmlFor="in development" className="text-sm capitalize cursor-pointer">In development</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" value="completed" id="completed" name="projectState" className="cursor-pointer" onChange={(e) => handleProjectState(e)} />
                    <label htmlFor="completed" className="text-sm capitalize cursor-pointer">completed</label>
                  </div>
                </div>
              </div>
              <div className='flex justify-start w-full items-center'>
                <button className='hover:text-orange-600'>
                  <label htmlFor="image">
                    <CiImageOn className="text-3xl cursor-pointer" title='Image' />
                  </label>
                </button>
                {
                  media.trim() == "" &&
                  <label htmlFor="image" className="cursor-pointer hover:text-orange-600">Resim Ekle</label>
                  ||
                  <p className='line-clamp-1 max-w-72' title={media}>{media}</p>
                }

              </div>
            </div>
          </div>
        </div>
        <textarea onChange={e => { setTechs(e.target.value) }} placeholder="Add your tech..." className="w-full border-2 border-slate-400 rounded-lg outline-none p-3 text-sm"></textarea>
        <ReactQuill formats={formats} modules={modules} value={value} onChange={setValue} theme="bubble" className='w-full h-60  dark:bg-slate-400 dark:text-black border-2 border-slate-400 dark:border-slate-800 rounded-lg ' placeholder="Describe your project..." />
      </div>


    </main>
  )
}

export default NewProject