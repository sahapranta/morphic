"use server";

import { NextRequest, NextResponse } from 'next/server';

import { CheckToken, saveToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (token) {
        try {
            const res = await CheckToken(token);
            saveToken(token.toString());
            return NextResponse.json({ redirect: '/search', user: res?.user }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error }, { status: 401 });
        }
    }

    return NextResponse.json({ error: 'Token not found' }, { status: 403 });
}
