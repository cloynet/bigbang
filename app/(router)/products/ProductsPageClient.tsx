"use client";
import React, { useState, useEffect } from "react";
import Products from "@/components/home/Products";
import Sidebar from "@/components/sidebar/Sidebar";
import { products as allProducts } from "@/lib/markdownService";
import { Menu } from "lucide-react";
import PageHero from "@/components/common/PageHero";

export default function ProductsPageClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    setFilteredProducts(
      allProducts.filter((p) => {
        const matchesCategory = category ? p.category === category : true;
        const matchesSearch = p.title
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      })
    );
  }, [search, category]);

  return (
    <>
      <PageHero
        title='Ürünlerimiz'
        subtitle='Kalite, estetik ve güveni bir araya getiren çözümlerimizi keşfedin.'
      />
      <section className=''>
        {/* Masaüstü sidebar */}
        {/* <div className='hidden md:block w-64 border-r border-gray-200'>
        <Sidebar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />
      </div> */}

        {/* Mobil sidebar + overlay */}
        {/* {mobileOpen && (
        <> */}
        {/* Overlay */}
        {/* <div
            className='fixed inset-0 bg-black/40 z-40'
            onClick={() => setMobileOpen(false)}
          /> */}

        {/* Sidebar */}
        {/* <div
            className='fixed top-0 left-0 h-full bg-white z-50 p-4'
            style={{ width: "17rem" }}
          > */}
        {/* Kapatma butonu sağ üst */}
        {/* <button
              className='absolute top-2 right-2 text-gray-600 text-lg font-bold'
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>

            <Sidebar
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
            />
          </div>
        </>
      )} */}

        {/* Ana içerik */}
        <main className='mx-auto container px-4'>
          {/* Mobil trigger */}
          {/* <div className='md:hidden mb-4'>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className='px-4 py-2 bg-pink-500 text-white rounded-md flex items-center gap-2'
          >
            <Menu className='w-5 h-5' /> Menü
          </button>
        </div> */}

          <Products
            showDescription={false}
            buttonText='Satın Al'
            useSlugLink={true}
            withBackground={false}
            products={filteredProducts}
            showTitle={false}
          />
        </main>
      </section>
    </>
  );
}
