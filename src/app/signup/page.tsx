import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
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
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">Daftar Akun Baru</h1>
          <p className="text-xs text-zinc-500">
            Daftar untuk menyimpan skenario simulasi Anda.
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-none space-y-4">
          <form className="space-y-4">
            <Input
              label="Nama Lengkap"
              placeholder="Contoh: Budi Santoso"
              defaultValue="Budi Santoso"
              required
            />

            <Input
              label="Alamat Email"
              type="email"
              placeholder="nama@email.com"
              defaultValue="budi@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Minimal 8 karakter"
              defaultValue="password123"
              required
            />

            <Input
              label="Konfirmasi Password"
              type="password"
              placeholder="Ketik ulang password"
              defaultValue="password123"
              required
            />

            <div className="pt-2">
              <Button variant="primary" size="md" className="w-full font-semibold">
                Buat Akun
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-600">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold text-zinc-900 hover:underline">
              Masuk Akun
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
