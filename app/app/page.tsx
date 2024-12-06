'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

export default function AppTokenPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch(`/api/validate?token=${token}`, {
                    method: 'POST' // Change to POST to prevent caching
                });
                const result = await response.json();

                if (result.redirect) {
                    // router.push(result.redirect);

                }
            } catch (error) {
                // router.push('/login');
            }
        };

        // Use a flag to prevent double-calling
        let isMounted = true;
        if (isMounted) {
            validateToken();
        }

        return () => {
            isMounted = false;
        };
    }, [token]);

    return <div className="min-h-[87vh] flex items-center justify-center overflow-hidden">
        <div className="bg-white p-8 max-w-md w-full space-y-8">
            <div className="flex justify-center">
                <Spinner />
            </div>
            <h2 className="text-center mt-6 text-xl text-gray-900 dark:text-gray-200">
                Processing your authentication...
            </h2>

        </div>
    </div>;
}