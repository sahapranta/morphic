'use server';

import { cookies } from 'next/headers'

const API_URL: string = process.env.API_URL || "https://web.aiapp.gg";

interface Auth { email: FormDataEntryValue | null, password: FormDataEntryValue | null }

export const logIn = async (formData: FormData) => {
    const user = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    try {
        const { accessToken } = await getToken(user);
        saveToken(accessToken);

    } catch (error: any) {
        return error.message || 'Something went wrong';
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
