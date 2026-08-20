"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!isPending && session) {
            router.replace("/simulations");
        }
    }, [session, isPending, router]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                throw new Error(error.message || "Email atau password salah");
            }

            router.replace("/simulations");
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
        <div className="rounded-lg border border-zinc-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
            {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-md">
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

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="pt-2">
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full font-medium"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-1.5">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Memproses...
                            </span>
                        ) : (
                            <>
                                Masuk ke Akun
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </form>

            <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-500">
                Belum memiliki akun?{" "}
                <Link href="/signup" className="font-semibold text-zinc-900 hover:underline">
                    Daftar di sini
                </Link>
            </div>
        </div>
    );
}