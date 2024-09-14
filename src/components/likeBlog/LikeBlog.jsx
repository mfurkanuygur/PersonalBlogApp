"use client"
import { getOneBlog, getOneBlogLikes, updateBlogLikes } from "@/requests/request";
import { useCallback, useEffect, useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { toast } from "react-toastify";

const LikeBlog = ({ slug }) => {
    const [likeNumber, setLikeNumber] = useState(0);
    const [hasLiked, setHasLiked] = useState(false)

    const likedBlogs = (slug) => {
        let likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || [];
        if (!likedBlogs.includes(slug)) {
            likedBlogs.push(slug);
            localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
            toast.success("Beğenildi... :)")
        }
        else {
            likedBlogs = likedBlogs.filter(blogSlug => blogSlug !== slug);
            localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
            toast.warning("Beğeni geri alındı...")
        }
    };

    const isBlogLiked = (slug) => {
        const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || [];
        return likedBlogs.includes(slug);
    };
    useEffect(() => {
        const liked = isBlogLiked(slug);
        setHasLiked(liked);
        getOneBlogLikes(slug).then(data => setLikeNumber(data))
    }, []);

    const handleLikeBlog = useCallback(async () => {
        try {
            const newLike = hasLiked ? Math.max(likeNumber - 1, 0) : likeNumber + 1;
            setLikeNumber(newLike);
            setHasLiked(!hasLiked);

            if (hasLiked) {
                likedBlogs(slug);
            } else {
                likedBlogs(slug); 
            }
            await updateBlogLikes(slug, newLike);
        } catch (error) {
            console.error('Beğenme işlemi sırasında bir hata oluştu:', error);
            if (hasLiked) {
                setLikeNumber(likeNumber + 1);
                setHasLiked(true);
            } else {
                setLikeNumber(likeNumber - 1);
                setHasLiked(false);
            }
        }
    }, [slug, hasLiked, likeNumber]);

    return (
        <div className="flex justify-center items-center gap-1 ">
            <p className="text-base font-bold">{likeNumber}</p>
            <IoIosHeart className={`text-3xl cursor-pointer transition-all ${hasLiked ? 'text-orange-600  lg:hover:text-slate-400' : 'text-slate-400 lg:hover:text-orange-600'}`} onClick={handleLikeBlog} />
        </div>
    )
}

export default LikeBlog