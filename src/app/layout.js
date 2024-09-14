import { Inter } from "next/font/google";
import "./globals.css";
import DarkModeProvider from "@/provider/DarkModeProvider";
import Navbar from "@/components/navbar/Navbar";
import { Flip, ToastContainer } from "react-toastify";
import AuthProvider from "@/provider/AuthProvider";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MFU",
  description: "Developed by Muhammed Furkan Uygur",
  authors: "Muhammed Furkan Uygur"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className=" bg-gray-100 text-black dark:bg-gray-950 dark:text-slate-200 flex" >
        <DarkModeProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <ToastContainer
              stacked
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss={false}
              pauseOnHover
              rtl={false}
              draggable
              theme="light"
              transition={Flip}
            />
          </AuthProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
