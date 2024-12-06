'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

function AppTokenPageContent() {
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
                    method: 'POST'
                });
                const result = await response.json();

                if (result.redirect) {
                    router.push(result.redirect);
                }
            } catch (error) {
                router.push('/login');
            }
        };

        let isMounted = true;
        if (isMounted) {
            validateToken();
        }

        return () => {
            isMounted = false;
        };
    }, [router, token]);

    return (
        <div className="min-h-[87vh] flex items-center justify-center overflow-hidden">
            <div className="bg-white p-8 max-w-md w-full space-y-8">
                <div className="flex justify-center">
                    <Spinner />
                </div>
                <h2 className="text-center mt-6 text-xl text-gray-900 dark:text-gray-200">
                    Processing your authentication...
                </h2>
            </div>
        </div>
    );
}

export default function AppTokenPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AppTokenPageContent />
        </Suspense>
    );
}