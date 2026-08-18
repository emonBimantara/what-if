import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fafaf9]">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-white font-bold text-sm">
              W
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