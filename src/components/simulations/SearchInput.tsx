import { Search } from "lucide-react";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchInput({
    value,
    onChange,
}: SearchInputProps) {
    return (
        <div className="relative flex items-center w-full">
            <Search className="absolute left-3 h-3.5 w-3.5 text-zinc-400 select-none pointer-events-none" />
            <input
                type="text"
                placeholder="Cari simulasi..."
                className="w-full rounded-md border border-zinc-200 bg-white pl-9 pr-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-colors"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
}