import Image from 'next/image';
import loading from '../../../public/loading.svg';
const Loading = () => {
    return (
        <div className="relative w-full min-h-screen flex flex-col gap-2 font-bold justify-center items-center text-center">
            <Image src={loading} alt="loading..." className='absolute' />
            <p>Loading...</p>
        </div>
    )
}

export default Loading