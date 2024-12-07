'use server';

import { cookies } from 'next/headers'

const API_URL: string = process.env.API_URL || "https://web.aiapp.gg";

interface Auth { email: FormDataEntryValue | null; password: FormDataEntryValue | null; }
export interface User { id: number; name: string; email: string; }
interface LoginResponse {
    user: User | null;
    error: string | null;
}

interface TokenResponse { user: User; accessToken: string; token_type: string }

export const logIn = async (formData: FormData): Promise<LoginResponse> => {
    const email = formData.get("email");
    const password = formData.get("password");

    // Validate and type-check formData values
    if (typeof email !== "string" || typeof password !== "string") {
        return { user: null, error: "Invalid information" };
    }

    try {
        const { user, accessToken } = await getToken({ email, password });
        saveToken(accessToken);
        return { user, error: null };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return { user: null, error: message };
    }
}

export const getToken = async (payload: Auth): Promise<any> => {
    const response = await fetch(API_URL + "/api/login", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const CheckToken = async (token: string | null): Promise<any> => {
    const response = await fetch(API_URL + "/api/auth/check", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: "POST",
    });

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}

export const saveToken = (token: string | null) => {
    if (!token) return;

    const expires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 8 Hours

    cookies().set('aiapp', token, { expires, httpOnly: true });
}

export const logout = () => cookies().set('aiapp', "", { expires: new Date(0) });
