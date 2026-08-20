import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/simulations");
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fafaf9]">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900 text-white font-bold text-xs font-mono">
              W/I
            </div>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">Masuk Akun</h1>
          <p className="text-xs text-zinc-500">
            Masuk untuk melihat simulasi finansial tersimpan.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}