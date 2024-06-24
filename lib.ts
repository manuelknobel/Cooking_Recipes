import { SessionOptions } from "iron-session";

export interface SessionData {
    id?: number;
    username?: string;
    is_admin?: boolean;
    isLoggedIn: boolean;
    accessToken?: string;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
};

if (!process.env.SESSION_PASSWORD) {
    throw new Error("SESSION_PASSWORD environment variable is not set");
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_PASSWORD,
    cookieName: "session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure in production
    },
};
