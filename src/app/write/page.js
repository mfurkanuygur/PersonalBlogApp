"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import "react-quill/dist/quill.bubble.css"
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-quill/dist/quill.bubble.css";
import { app } from '@/utils/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { postNewBlog } from '@/requests/request';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});
const Write = () => {
  const { data, status } = useSession();
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter()
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          // [{ font: [] }],
          // [{ header: [false, 4, 3, 2, 1] }],
          // [{ size: ["small", "normal", "large", "huge"] }],
          ["bold", "italic", "underline", 'strike', "blockquote"],
          // [{ color: [] }],
          // [{ background: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            // { indent: "-1" },
            // { indent: "+1" },
          ],
          ["link", "video"],
          // "image", 
          // [{ align: [] }],
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
    // "font",
    // "header",
    // "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    // 'formula',
    "list",
    "bullet",
    // "indent",
    "link",
    // "image",
    // "video",
    // "color",
    // "background",
    "clean",
    // 'align',
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

  const handlePublishBlog = async () => {
    if (file && media !== "" && value !== "" && title !== "" && category !== "") {
      if (data && data.user) {
        const newBlog = {
          // id: self.crypto.randomUUID(),
          title: title,
          text: value,
          image: media,
          // blogCategory: category,
          slug: slugify(title),
          likes: 0,
          date: new Date().toISOString(),
        }
        postNewBlog(newBlog)
        toast.success("Eklendi", {
          onClose: () => {
            router.push("/blogs");
          }
        })
      }
      else {
        toast.error("Admin değilsiniz!", {
          onClose: () => {
            router.push("/blogs");
          }
        })
      }
    }
    else {
      toast.warning("Tüm alanları doldurman gerek!")
    }
  }
  return (
    <main className=' w-full flex flex-col gap-4 items-start justify-start max-w-xl md:max-w-2xl md:px-12 mx-auto p-6  '>
      <div className='w-full flex flex-col justify-center items-center gap-4 '>
        <div className='w-full flex justify-between items-center'>
          <h1 className='text-3xl capitalize text-start w-full'>Yeni yazı</h1>
          <button onClick={() => handlePublishBlog()} className='px-4 py-2 rounded-lg text-sm border-2 border-orange-600 hover:bg-orange-600 transition-all hover:text-slate-100'>Yayınla</button>
        </div>
        <input type="text" placeholder='Başlık...' className='w-full outline-none border-2 border-slate-400 py-2 px-3 rounded-lg' onChange={(e) => { setTitle(e.target.value) }} />
        <div className='w-full flex flex-col lg:flex-row justify-between items-center  gap-4'>
          <div className='w-full flex  justify-start items-center  gap-4 '>
            <select name="" id="" className='px-4 py-2 rounded-lg cursor-pointer' onChange={e => setCategory(e.target.value)}>
              <option disabled>Seçiniz</option>
              <option value="personal">Kişisel</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
            </select>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <div className='flex items-center gap-1'>
              <button className='hover:text-orange-600'>
                <label htmlFor="image">
                  <CiImageOn className="text-3xl cursor-pointer" title='Image' />
                </label>
              </button>
              <p className='line-clamp-1 max-w-72' title={media}>{media}</p>
            </div>
          </div>
        </div>
        <ReactQuill formats={formats} modules={modules} value={value} onChange={setValue} theme="bubble" className='text-lg w-full min-h-96  dark:bg-slate-400 dark:text-black border-2 border-slate-400 dark:border-slate-800 rounded-lg ' placeholder="Tell your story..." />
      </div>
    </main>
  )
}

export default Write