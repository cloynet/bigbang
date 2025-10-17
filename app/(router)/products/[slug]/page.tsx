"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { products, Product } from "@/lib/markdownService";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product: Product | undefined = products.find((p) => p.slug === slug);

  const [formData, setFormData] = useState<
    Record<string, string | File | File[]>
  >({});

  if (!product) {
    return (
      <div className='pt-24 text-center text-red-500'>
        Ürün bulunamadı veya geçersiz bağlantı.
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const galeriFiles = formData["galeri"] as File[] | undefined;

    if (!galeriFiles || galeriFiles.length < 4) {
      alert(
        "Lütfen galeri için en az 4 fotoğraf yükleyin (ilk 4 fotoğraf ana alanda gösterilecektir)."
      );
      return;
    }

    if (galeriFiles.length > 10) {
      alert("Galeri için en fazla 10 fotoğraf yükleyebilirsiniz.");
      return;
    }

    console.log("Gönderilen veriler:", formData);

    const mainPhotos = galeriFiles.slice(0, 4);
    const galleryPhotos = galeriFiles;
  };

  return (
    <div className='container mx-auto px-4 py-24 grid md:grid-cols-2 gap-10'>
      {/* Sol taraf: Ürün görseli ve açıklama */}
      <div>
        <Image
          src={product.image || ""}
          alt={product.title}
          width={600}
          height={600}
          className='rounded-xl shadow-md object-cover'
        />
        <h1 className='text-3xl font-bold mt-4'>{product.title}</h1>
        <p className='text-muted-foreground mt-2'>{product.description}</p>
      </div>

      {/* Sağ taraf: Dinamik form */}
      <div className='bg-white p-6 rounded-xl shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Kişiselleştir</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {product.formFields.map((field) => (
            <div key={field.name}>
              <label className='block font-medium mb-1'>{field.label}</label>

              {field.type === "textarea" ? (
                <Textarea
                  name={field.name}
                  required={field.required}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  multiple={field.multiple}
                  onChange={(e) => {
                    const { files, value } = e.target as HTMLInputElement;
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: files
                        ? field.multiple
                          ? Array.from(files)
                          : files[0]
                        : value,
                    }));
                  }}
                  className='w-full border rounded-md p-2'
                />
              )}
            </div>
          ))}

          <Button
            type='submit'
            className='w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition'
          >
            Satın Al
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProductDetailPage;
