"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertMessage } from "@/components/ui/alert-message";
import { logIn, User } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useAuth } from "@/lib/state/AuthProvider";

export default function Page() {
    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuth();

    const storeUserToLocal = (user: User | null) => {
        if (!user) return;
        setUser(user);
    }

    return (
        <div className="min-h-[87vh] flex items-center justify-center overflow-hidden relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 shadow-xl border border-gray-100 dark:border-gray-700 max-w-md w-full space-y-8 relative z-10">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                        AIAPP. <span className="text-orange-800/70 dark:text-orange-400">GG</span>
                    </h2>

                    <AlertMessage message={errors} type="error" onClose={() => setErrors("")} />
                    <AlertMessage message={success} type="success" onClose={() => setSuccess("")} />

                </div>
                <Form.Root className="space-y-6" action={async (formData) => {
                    setIsLoading(true);
                    setErrors('');
                    setSuccess('');
                    let success = false;
                    try {
                        const { user, error } = await logIn(formData);
                        if (error != null) {
                            setErrors(error);
                        } else {
                            setSuccess("Login successful!");
                            storeUserToLocal(user);
                            success = true;
                        }
                    } catch (error) {
                        setErrors(error instanceof Error ? error.message : "An unexpected error occurred");
                    } finally {
                        setIsLoading(false);
                    }

                    if (success) {
                        redirect('/search');
                    }
                }}>
                    <Form.Field name="email">
                        <div className="flex items-center justify-between">
                            <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</Form.Label>
                            <Form.Message className="text-xs text-red-500" match="valueMissing">
                                Please enter your email
                            </Form.Message>
                        </div>
                        <div className="mt-1">
                            <Form.Control asChild>
                                <input
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="you@example.com"
                                />
                            </Form.Control>
                        </div>
                    </Form.Field>

                    <Form.Field name="password">
                        <div className="flex items-center justify-between">
                            <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</Form.Label>
                            <Form.Message className="text-xs text-red-500" match="valueMissing">
                                Please enter your password
                            </Form.Message>
                        </div>
                        <div className="mt-1">
                            <Form.Control asChild>
                                <input
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </Form.Control>
                        </div>
                    </Form.Field>
                    <div>
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-800"
                            disabled={isLoading}
                        >
                            {isLoading ? <div className="flex gap-2">
                                <Spinner />
                                Signing in...
                            </div> : "Sign in"}
                        </Button>
                    </div>
                </Form.Root>
            </div>
        </div>
    );
}
