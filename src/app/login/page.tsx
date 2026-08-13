import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fafaf9]">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
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

        {/* Card Form */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-none space-y-4">
          <form className="space-y-4 font-sans">
            <Input
              label="Alamat Email"
              type="email"
              placeholder="nama@email.com"
              defaultValue="user@example.com"
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
                type="password"
                placeholder="••••••••"
                defaultValue="password123"
                required
              />
            </div>

            <div className="pt-2">
              <Button variant="primary" size="md" className="w-full font-semibold">
                Masuk
                <ArrowRight className="h-4 w-4" />
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

        <div className="text-center text-[11px] text-zinc-500 bg-zinc-100 p-2.5 rounded border border-zinc-200">
          🔒 Interface Prototype — Form statis tanpa autentikasi backend.
        </div>
      </div>
    </div>
  );
}
