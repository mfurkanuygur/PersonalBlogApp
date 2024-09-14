import Image from "next/image"
import notfound from "../../public/404.gif"

const notFound = () => {
    return (
        <div className=" w-full flex flex-col  items-center justify-center max-w-md  mx-auto">
            <Image src={notfound} width={300} height={300} alt="Page not found..."/>
            <h1 className="text-xl font-bold">Oopps! Page not found!</h1>
        </div>
    )
}

export default notFound