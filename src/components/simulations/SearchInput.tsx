"use client";

import Input from "@/components/ui/Input";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchInput({
    value,
    onChange,
}: SearchInputProps) {
    return (
        <Input
            placeholder="Cari simulasi..."
            className="py-1 text-xs"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    );
}