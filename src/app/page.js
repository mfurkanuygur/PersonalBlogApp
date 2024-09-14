"use client"
import Image from "next/image";
import { RiNextjsFill, RiTailwindCssFill, RiJavascriptFill, RiHtml5Fill, RiCss3Fill, RiReactjsFill, RiGithubFill } from "react-icons/ri";
import { SiVercel, SiStyledcomponents, SiMongodb } from "react-icons/si";
import nextauth from '../../public/nextauth.png'
import reacticons from '../../public/reacticons.png'
import sanitizehtml from '../../public/sanitizehtml.png'
import quill from '../../public/quill.svg'
import neurelo from '../../public/neurelo.png'
import firebase from '../../public/firebase.svg'
import emailjs from '../../public/emailjs.svg'
import zustand from '../../public/zustand.jpg'
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useBlogStore, useProjectStore } from "@/store/store";

const educations = [
  {
    "school": "Erciyes Üniversitesi",
    "level": "Yüksek Lisans",
    "gano": "3.50/4",
    "year": "2022-2024"
  },
  {
    "school": "Erciyes Üniversitesi",
    "level": "Lisans",
    "gano": "2.91/4",
    "year": "2017-2021"
  },
  {
    "school": "Erciyes Üniversitesi",
    "level": "Yabancı Dil",
    "gano": "B2",
    "year": "2016-2017"
  }
]

export default function Home() {
  const pathname = usePathname()
  const { resetBlogPageNumber, resetBlogsPerPage } = useBlogStore()
  const { resetProjectPageNumber, resetProjectsPerPage } = useProjectStore()

  useEffect(() => {
    if (!pathname == "/blogs" || !pathname.includes("/blogs")) {
      resetBlogPageNumber()
      resetBlogsPerPage()
    }
    if (!pathname == "/projects" || !pathname.includes("/projects")) {
      resetProjectPageNumber()
      resetProjectsPerPage()
    }
  }, [pathname])
  return (
    <main className=" w-full flex flex-col gap-4 items-start lg:justify-center max-w-xl md:max-w-2xl md:px-12 mx-auto p-6  overflow-hidden ">
      <div className="animate-open-card w-full flex flex-col gap-2">
        <p className="text-lg">Merhabalar!</p>
        <h1 className="text-4xl font-bold ">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-600 to-amber-800  ">
            Ben M.Furkan Uygur
          </span>
        </h1>
        <div className="text-justify text-lg flex flex-col gap-4">
          <p >
            Frontend Developer olma yolunda emin adımlarla ilerlemekteyim. React ve Next
            ile projeler geliştiriyorum. Bunun yanında Vue, Angular gibi farklı Javascript
            frameworkleri ile de  küçük  projeler geliştirdim.
          </p>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-600 to-amber-800">Nedir bu proje?</h2>
          <ul className="list-disc list-inside">Aslında 2 amacı var diyebilirim:
            <li >İlk amaç kendimi tanıtmak, </li>
            <li >İkinci amaç ise duygu ve düşüncelerimi paylaşabileceğim
              bunun yanında yeri geldiğinde faydalı bilgiler yazabileceğim bir blog uygulaması yapmak. </li>
          </ul>
          <p>Peki neler kullandım bu projede?</p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 items-center text-center">
            <div className="flex flex-col items-center h-32  justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <RiHtml5Fill className="text-7xl text-orange-500" />
              <p className="text-sm">HTML</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <RiCss3Fill className="text-7xl text-blue-500" />
              <p className="text-sm">CSS</p>
            </div>
            <div className="flex flex-col items-center min-h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <RiJavascriptFill className="text-7xl text-yellow-400" />
              <p className="text-sm">Javascript</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <RiReactjsFill className="text-7xl text-sky-400" />
              <p className="text-sm">React</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <RiNextjsFill className="text-7xl dark:text-white" />
              <p className="text-sm">Next</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <RiTailwindCssFill className="text-7xl text-sky-500" />
              <p className="text-sm">Tailwind CSS</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <Image src={nextauth} alt="next auth" className="w-14" />
              <p className="text-sm">Next Auth</p>
            </div>

            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <SiMongodb className="text-7xl text-green-600" />
              <p className="text-sm">MongoDB</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <Image src={neurelo} alt="neurelo" className="w-28 mt-5 bg-gray-900 p-2 rounded-lg " />
              <p className="text-sm">Neurelo</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <Image src={firebase} alt="firebase" className="w-28 mt-5 p-2 rounded-lg text-slate-100  " />
              <p className="text-sm">Firebase</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <Image src={zustand} alt="zustand" className="w-20 p-2 rounded-lg " />
              <p className="text-sm">Zustand</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <Image src={sanitizehtml} alt="sanitize html" className="w-16" />
              <p className="text-sm">Sanitize HTML</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <Image src={emailjs} alt="emailjs" className="w-20 p-2 rounded-lg " />
              <p className="text-sm">EmailJS</p>
            </div>

            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <Image src={reacticons} alt="react icons" className="w-16" />
              <p className="text-sm">React Icons</p>
            </div>

            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <Image src={quill} alt="quill" className="w-20 mt-4" />
              <p className="text-sm">React Quill</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <SiStyledcomponents className="text-6xl " />
              <p className="text-sm">Styled Components</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <RiGithubFill className="text-7xl dark:text-white" />
              <p className="text-sm">Github</p>
            </div>
            <div className="flex flex-col items-center h-32 justify-between border-2 border-slate-800 hover:scale-110 transition-all p-3 rounded-lg">
              <SiVercel className="text-7xl dark:text-white" />
              <p className="text-sm">Vercel</p>
            </div>
          </div>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-600 to-amber-800">Ben Kimim?</h2>
          <p>1997 Sivas doğumluyum. Erciyes Üniversitesi Bilgisayar Mühendisliği mezunuyum ve aynı bölümde yüksek lisans yapmaktayım.
            Yüksek lisans sonrasında akademik anlamda bir kariyerde düşünmekteyim.
          </p>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-600 to-amber-800">Eğitim Hayatım</h2>
          {
            educations.map((e, i) => (
              <div key={i} className="border-2 border-slate-400 dark:border-slate-800 bg-slate-300 dark:bg-slate-900 p-4 w-full rounded-lg">
                <p className="text-xl font-semibold">{e.school}</p>
                <p >{e.level}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm">{e.gano}</p>
                  <p className="text-xs">{e.year}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );
}
