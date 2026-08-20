"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteSimulation } from "@/lib/api/simulations";

export default function DeleteSimulationButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus hasil simulasi ini? Tindakan ini tidak dapat dibatalkan."
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await deleteSimulation(id);
      router.push("/simulations");
      router.refresh();
    } catch (error: any) {
      alert(error.message || "Gagal menghapus simulasi");
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="h-9 px-3 inline-flex items-center justify-center gap-1.5 rounded-md border border-zinc-200 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-zinc-700 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-2xs"
      title="Hapus laporan simulasi ini"
    >
      {isDeleting ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-rose-600" />
      ) : (
        <Trash2 className="h-3.5 w-3.5 shrink-0" />
      )}
      <span>{isDeleting ? "Menghapus..." : "Hapus"}</span>
    </button>
  );
}