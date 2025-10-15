"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    name: "Seviliye özel site",
    mainImage: "/a4.jpeg",
    images: ["/a4.jpeg", "/a4.jpeg", "/a4.jpeg"],
  },
  {
    name: "E-Davetiye",
    mainImage: "/a4.jpeg",
    images: ["/a4.jpeg", "/a4.jpeg", "/a4.jpeg"],
  },
];

function Gallery() {
  const [activeImages, setActiveImages] = useState<string[]>([]);
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Galerimiz</h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Sizler için en güzel anılarınızı topluyoruz
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className='cursor-pointer rounded-2xl shadow-lg border border-border overflow-hidden'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    onClick={() => setActiveImages(project.images)}
                    className='relative overflow-hidden rounded-t-2xl group'
                  >
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={project.mainImage}
                        alt={project.name}
                        fill
                        className='object-cover rounded-md transition-transform duration-300 group-hover:scale-105'
                      />
                      {/* Overlay */}
                      <div className='hidden md:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 items-center justify-center transition-opacity duration-300'>
                        {/* 4 köşe çizgileri */}
                        <div className='relative w-24 h-24'>
                          <div className='absolute top-0 left-0 w-6 h-1 bg-white'></div>
                          <div className='absolute top-0 left-0 w-1 h-6 bg-white'></div>
                          <div className='absolute top-0 right-0 w-6 h-1 bg-white'></div>
                          <div className='absolute top-0 right-0 w-1 h-6 bg-white'></div>
                          <div className='absolute bottom-0 left-0 w-6 h-1 bg-white'></div>
                          <div className='absolute bottom-0 left-0 w-1 h-6 bg-white'></div>
                          <div className='absolute bottom-0 right-0 w-6 h-1 bg-white'></div>
                          <div className='absolute bottom-0 right-0 w-1 h-6 bg-white'></div>
                        </div>
                      </div>
                      {/* Mobil overlay */}
                      <div className='flex md:hidden absolute inset-0 bg-black/20 items-center justify-center'>
                        <div className='relative w-12 h-12'>
                          <div className='absolute top-0 left-0 w-3 h-0.5 bg-white'></div>
                          <div className='absolute top-0 left-0 w-0.5 h-3 bg-white'></div>
                          <div className='absolute top-0 right-0 w-3 h-0.5 bg-white'></div>
                          <div className='absolute top-0 right-0 w-0.5 h-3 bg-white'></div>
                          <div className='absolute bottom-0 left-0 w-3 h-0.5 bg-white'></div>
                          <div className='absolute bottom-0 left-0 w-0.5 h-3 bg-white'></div>
                          <div className='absolute bottom-0 right-0 w-3 h-0.5 bg-white'></div>
                          <div className='absolute bottom-0 right-0 w-0.5 h-3 bg-white'></div>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>
                </DialogTrigger>

                <DialogContent className='w-full max-w-full md:max-w-5xl lg:max-w-6xl'>
                  <DialogTitle className='sr-only'>{project.name}</DialogTitle>
                  <Carousel className=' md:w-full p-1 md:p-2'>
                    <CarouselContent>
                      {activeImages.map((img, i) => (
                        <CarouselItem key={i}>
                          <Card className='flex aspect-square items-center justify-center p-2'>
                            <CardContent className='w-full h-full relative'>
                              <Image
                                src={img}
                                alt={`${project.name} ${i + 1}`}
                                fill
                                className='object-cover rounded-md'
                              />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
