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
      className="h-9 px-3.5 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin text-white" />
      ) : (
        <Trash2 className="h-4 w-4 shrink-0 text-white" />
      )}
      <span>{isDeleting ? "Menghapus..." : "Hapus"}</span>
    </button>
  );
}