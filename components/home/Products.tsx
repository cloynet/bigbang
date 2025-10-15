"use client";
import React from "react";
import { products as defaultProducts } from "@/lib/markdownService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface Product {
  slug: string;
  title: string;
  category?: string;
  description: string;
  content: string;
  features: string[];
  color: string;
  delay?: number;
  pageTitle?: string;
  showTitle?: boolean;
}

interface ProductsProps {
  showDescription?: boolean;
  buttonText?: string;
  buttonLink?: string;
  useSlugLink?: boolean;
  withBackground?: boolean;
  pageTitle?: string;
  showTitle?: boolean;
  products?: Product[];
}

function Products({
  showDescription = true,
  buttonText = "Detayları Gör",
  buttonLink = "/products",
  useSlugLink = false,
  withBackground = true,
  products = defaultProducts,
  pageTitle = "Ürünlerimiz",
  showTitle = false,
}: ProductsProps) {
  return (
    <section
      className={`w-full h-full py-20 ${
        withBackground ? "bg-gradient-to-b from-white to-pink-50" : ""
      }`}
    >
      <div className='container mx-auto px-4'>
        {showTitle && (
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>{pageTitle}</h2>
            {showDescription && (
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Sevgilinle anılarını paylaşabileceğin en romantik dijital alan
                💞
              </p>
            )}
          </div>
        )}

        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: product.delay }}
              className='h-full'
            >
              <Card className='relative overflow-hidden border border-pink-200/40 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col'>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.color} pointer-events-none`}
                />

                <CardHeader className='relative z-10'>
                  <CardTitle className='text-2xl font-bold'>
                    {product.title}
                  </CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>

                <CardContent className='relative z-10 space-y-4 flex-1'>
                  <p className='text-sm text-muted-foreground'>
                    {product.content}
                  </p>
                  <ul className='space-y-2 mt-4'>
                    {product.features.map((feature, i) => (
                      <li key={i} className='flex items-center gap-2'>
                        <CheckCircle2 className='w-5 h-5 text-pink-500' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className='relative z-10 mt-auto'>
                  <Link
                    href={
                      useSlugLink
                        ? `/products/${product.slug}`
                        : buttonLink || "/products"
                    }
                  >
                    <Button className='cursor-pointer w-full md:w-xs py-2 px-4 mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md font-medium hover:scale-105 transition-transform'>
                      {buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
