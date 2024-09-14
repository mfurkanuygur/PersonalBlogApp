import { create } from 'zustand'

export const useBlogStore = create((set) => ({
    blogPageNumber: 1,
    blogsPerPage: 3,
    increaseBlogPageNumber: () => set((state) => ({ blogPageNumber: state.blogPageNumber + 1 })),
    decreaseBlogPageNumber: () => set((state) => ({ blogPageNumber: state.blogPageNumber - 1 })),
    increaseBlogsPerPage: () => set(state => ({ blogsPerPage: state.blogsPerPage + 3 })),
    decreaseBlogsPerPage: () => set(state => ({ blogsPerPage: state.blogsPerPage - 3 })),
    resetBlogPageNumber: () => set({ blogPageNumber: 1 }),
    resetBlogsPerPage: () => set({ blogsPerPage: 3 }),
}))

export const useProjectStore = create((set) => ({
    projectPageNumber: 1,
    projectsPerPage: 3,
    increaseProjectPageNumber: () => set((state) => ({ projectPageNumber: state.projectPageNumber + 1 })),
    decreaseProjectPageNumber: () => set((state) => ({ projectPageNumber: state.projectPageNumber - 1 })),
    increaseProjectsPerPage: () => set(state => ({ projectsPerPage: state.projectsPerPage + 3 })),
    decreaseProjectsPerPage: () => set(state => ({ projectsPerPage: state.projectsPerPage - 3 })),
    resetProjectPageNumber: () => set({ projectPageNumber: 1 }),
    resetProjectsPerPage: () => set({ projectsPerPage: 3 }),
}))