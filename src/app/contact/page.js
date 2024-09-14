// import { sendEmail } from "@/lib/mailForm"
"use client"
import { useEffect, useState } from "react"
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from "next/navigation";
import { useBlogStore, useProjectStore } from "@/store/store";

const Contact = () => {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [mail, setMail] = useState("")
  const [message, setMessage] = useState("")
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
  
  const sendEmail = (e) => {
    e.preventDefault()
    const templateParams = {
      from_name: name + " " + surname,
      reply_to: mail,
      message: message,
    };
    if (name.trim() !== "" && surname.trim() !== "" && mail.trim() !== "" && message.trim() !== "") {
      emailjs.send('service_j4qmei8', 'template_sdfwc4f', templateParams, "9AUOtO7vqvJc4dOeK")
        .then(() => {
          toast.success('E-posta gönderildi');
        })
        .catch((error) => {
          toast.error('E-posta gönderilirken bir hata oluştu:', error);
        });
      setMessage(""), setMail(""), setName(""), setSurname("")
    }
    else {
      toast.error("Tüm alanları doldurunuz!")
    }
  }

  return (
    <main className="w-full flex flex-col gap-4 items-start justify-start max-w-xl md:max-w-2xl md:px-12 mx-auto p-6">
      <div className="w-full overflow-hidden">
        <div className="animate-open-card  flex flex-col gap-2">
          <h1 className='text-3xl font-bold '>İletişim</h1>
          <form className="w-full flex flex-col gap-4" onSubmit={sendEmail}>
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="flex flex-col gap-1 items-start w-1/2">
                <label htmlFor="name">Adınız:</label>
                <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Adınız..." id="name" name="name" type="text" className="outline-none p-2 rounded-lg w-full border-2 border-slate-400 dark:border-gray-600" />
              </div>
              <div className="flex flex-col gap-1 items-start w-1/2">
                <label htmlFor="surname">Soyadınız:</label>
                <input onChange={(e) => setSurname(e.target.value)} value={surname} placeholder="Soyadınız..." id="surname" name="surname" type="text" className="outline-none p-2 rounded-lg w-full border-2 border-slate-400 dark:border-gray-600" />
              </div>
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
              <label htmlFor="mail">Email Adresiniz:</label>
              <input onChange={(e) => setMail(e.target.value)} value={mail} placeholder="Email adresiniz..." id="mail" type="email" name="email" className="outline-none p-2 rounded-lg w-full border-2 border-slate-400 dark:border-gray-600" />
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
              <label htmlFor="message">Mesajınız:</label>
              <textarea onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Mesajınız..." id="message" name="message" type="text" rows={10} className="outline-none p-2 rounded-lg w-full border-2 border-slate-400 dark:border-gray-600" />
            </div>
            <button type="submit" className="w-full border-2 border-orange-600 hover:bg-orange-600 hover:text-slate-100 transition-all py-2 rounded-lg">Gönder</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Contact