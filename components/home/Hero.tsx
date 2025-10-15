"use client";
import React from "react";
import PageHero from "@/components/common/PageHero";

function Hero() {
  return (
    <PageHero
      title={
        <>
          <span className='flex justify-center items-center'>
            Sözlerle Değil,
          </span>
          <span className='block mt-4 sm:mt-6 pb-2 sm:text-4xl text-5xl lg:text-6xl text-[var(--color-primary-start)] font-bold'>
            Hediyeyle Söyle
          </span>
        </>
      }
      subtitle=''
      centered={true}
      height='large'
    />
  );
}

export default Hero;
