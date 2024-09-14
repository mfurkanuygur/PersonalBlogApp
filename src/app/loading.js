import Image from 'next/image';
import loading from '../../public/loading.svg';
const Loading = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center max-w-xl md:max-w-2xl md:px-12 mx-auto p-6 ">
            <Image src={loading} alt="loading..." className='absolute' />
            <p>Loading...</p>
        </div>
    )
}

export default Loading