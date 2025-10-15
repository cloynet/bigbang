import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface SidebarProps {
  search: string;
  setSearch: (value: string) => void;
  category: string | null;
  setCategory: (value: string | null) => void;
}

export default function Sidebar({
  search,
  setSearch,
  category,
  setCategory,
}: SidebarProps) {
  return (
    <div className='flex flex-col gap-4 p-4 border-r border-gray-200 w-64'>
      <h2 className='text-xl font-bold mb-2'>Filtrele</h2>

      {/* Arama */}
      <Input
        type='text'
        placeholder='Ürün ara...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='mb-2 p-2 border rounded w-full'
      />

      {/* Kategoriler */}
      <div className='flex items-center gap-2'>
        <Checkbox
          checked={category === "anilar"}
          onCheckedChange={(checked) => setCategory(checked ? "anilar" : null)}
          id='anilar'
        />
        <label htmlFor='anilar'>Özel Site</label>
      </div>

      <div className='flex items-center gap-2'>
        <Checkbox
          checked={category === "edavetiye"}
          onCheckedChange={(checked) =>
            setCategory(checked ? "edavetiye" : null)
          }
          id='edavetiye'
        />
        <label htmlFor='edavetiye'>E-Davetiye</label>
      </div>

      {/* Sıfırla */}
      <Button
        variant='outline'
        onClick={() => {
          setCategory(null);
          setSearch("");
        }}
      >
        Filtreleri Sıfırla
      </Button>
    </div>
  );
}
