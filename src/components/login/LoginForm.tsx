"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth/auth-client";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                throw new Error(error.message || "Email atau password salah");
            }

            console.log("LOGIN SUCCESS:", data);
            window.location.href = "/simulations";
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Gagal masuk ke akun");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-none space-y-4">
            {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                <Input
                    label="Alamat Email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-zinc-700">Password</label>
                        <span className="text-[11px] text-zinc-600 hover:underline cursor-pointer">
                            Lupa Password?
                        </span>
                    </div>
                    <Input
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-1.5">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Memproses...
                            </span>
                        ) : (
                            <>
                                Masuk
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </form>

            <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-600">
                Belum punya akun?{" "}
                <Link href="/signup" className="font-semibold text-zinc-900 hover:underline">
                    Daftar Akun
                </Link>
            </div>
        </div>
    );
}