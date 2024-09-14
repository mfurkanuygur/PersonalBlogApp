import CredentialsProvider from "next-auth/providers/credentials";
const user = {
    email: process.env.USER_MAIL,
    password: process.env.USER_PASSWORD,
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (credentials.email === user.email && credentials.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            },
        })
    ],
}