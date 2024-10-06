import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { prismaClient } from "./db";

const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "name", type: "text", placeholder: "Name..." },
                email: { label: "email", type: "email", placeholder: "Email..." },
                password: { label: "Password", type: "password", placeholder: "Password..." },
            },
            async authorize(credentials) {
                if(!credentials?.password) return null;
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await prismaClient.user.findFirst({
                    where: {
                        email: credentials?.email
                    }
                });
                if(existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id,
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null;
                }
                const user = await prismaClient.user.create({
                    data: {
                        email: credentials?.email ?? "",
                        name: credentials?.name ?? "",
                        password: hashedPassword,
                        role: "ADMIN",
                    }
                });
                return user;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
    }
}

export default NEXT_AUTH;