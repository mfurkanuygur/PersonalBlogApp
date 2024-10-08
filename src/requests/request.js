const X_API_KEY=process.env.NEURELO
const baseURL = "https://us-east-2.aws.neurelo.com/rest/"

export const getAllBlogs = async (count) => {
    const url = baseURL + `myblogs?skip=${count - 3}&take=${count}&order_by=[{"date": "desc"}]`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
    };
    try {
        // , { next: { revalidate: 3600 } }, { cache: 'no-store' }
        const response = await fetch(url, options, { next: { revalidate: 60 } });
        const result = await response.json();
        return result.data
    } catch (error) {
        console.error(error);
    }
}
export const countOfBlogs = async () => {
    const url = baseURL + "myblogs"
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
    };
    try {
        // , { next: { revalidate: 3600 } }, { cache: 'no-store' }
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data.length
    } catch (error) {
        console.error(error);
    }
}

export const getOneBlog = async (slug) => {
    const url = baseURL + `myblogs/${slug}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
    };
    try {
        // , { next: { revalidate: 3600 } }, { cache: 'no-store' }
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data
    } catch (error) {
        console.error(error);
    }
}
export const getOneBlogLikes = async (slug) => {
    const url = baseURL + `myblogs/${slug}/?select={"likes": true}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data.likes
    } catch (error) {
        console.error(error);
    }
}

export const updateBlogLikes = async (slug, number) => {
    const url = baseURL + `myblogs/${slug}`
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
        body: JSON.stringify({ "likes": number })
    };
    try {
        // , { next: { revalidate: 3600 } }, { cache: 'no-store' }
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        return result.data.likes
    } catch (error) {
        console.error(error);
    }
}
export const postNewBlog = async (newBlog) => {
    const url = baseURL + "myblogs"
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
        body: JSON.stringify([newBlog]),
    };
    try {
        // , { next: { revalidate: 3600 } }, { cache: 'no-store' }
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}

export const deleteOneBlog = async (slug) => {
    const url = baseURL + `myblogs/${slug}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}
export const editOneBlog = async (slug, updatedBlog) => {
    const url = baseURL + `myblogs/${slug}`
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
        body: JSON.stringify(updatedBlog)
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}
export const postNewProject = async (newProject) => {
    const url = baseURL + "myprojects"
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
        body: JSON.stringify([newProject]),
    };
    try {
        // , { next: { revalidate: 3600 } }, { cache: 'no-store' }
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}
export const getAllProjects = async (count) => {
    const url = baseURL + `myprojects?skip=${count - 3}&take=${count}&order_by=[{"date": "desc"}]`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
    };
    try {
        // , { next: { revalidate: 3600 } }, { cache: 'no-store' }
        const response = await fetch(url, options, { next: { revalidate: 60 } });
        const result = await response.json();
        return result.data
    } catch (error) {
        console.error(error);
    }
}
export const countOfProjects = async () => {
    const url = baseURL + "myprojects"
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
    };
    try {
        // , { next: { revalidate: 3600 } }, { cache: 'no-store' }
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data.length
    } catch (error) {
        console.error(error);
    }
}

export const getOneProject = async (slug) => {
    const url = baseURL + `myprojects/${slug}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
    };
    try {
        // , { next: { revalidate: 3600 } }, { cache: 'no-store' }
        const response = await fetch(url, options, { next: { revalidate: 60 } });
        const result = await response.json();
        return result.data
    } catch (error) {
        console.error(error);
    }
}

export const deleteOneProject = async (slug) => {
    const url = baseURL + `myprojects/${slug}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}

export const editOneProject = async (slug, updatedProject) => {
    const url = baseURL + `myprojects/${slug}`
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': X_API_KEY,
        },
        body: JSON.stringify(updatedProject)
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}