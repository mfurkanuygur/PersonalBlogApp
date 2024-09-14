import Image from "next/image"
import notfound from "../../../public/404.gif"

const Notfound = () => {
    return (
        <div className="md:p-36 flex flex-col justify-center items-center gap-4">
            <Image src={notfound} width={300} height={300} alt="Page not found..."/>
            <h1 className="text-xl font-bold">Oopps! Nothing here!</h1>
        </div>
    )
}

export default Notfound