"use client";
import React from "react";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";

function AboutPageClient() {
  const cards = [
    {
      title: "Biz Kimiz?",
      description:
        "Biz, özel günlerinizi unutulmaz hale getirmek için dijital çözümler üreten yaratıcı bir ekibiz. Amacımız, her çiftin hikâyesine uygun özgün hediyeler ve deneyimler sunmaktır.",
    },
    {
      title: "Misyonumuz",
      description:
        "Her çiftin mutluluğunu dijital dünyaya taşımak, onların özel anlarını daha anlamlı kılmak.",
    },
    {
      title: "Vizyonumuz",
      description:
        "Yenilikçi dijital hediyelerle Türkiye'nin önde gelen özel gün platformu olmak.",
    },
    {
      title: "Neden Biz?",
      description: (
        <ul className='list-disc list-inside space-y-1'>
          <li>Her biri özenle hazırlanmış kişiselleştirilebilir ürünler</li>
          <li>Yaratıcı, genç ve dinamik bir ekip</li>
          <li>Hızlı teslimat ve güvenli alışveriş</li>
          <li>Müşteri memnuniyeti odaklı yaklaşım</li>
        </ul>
      ),
    },
    {
      title: "Ekibimiz",
      description:
        "Tasarım, yazılım ve dijital pazarlama alanlarında uzmanlaşmış bir ekiple çalışıyoruz. Her birimiz, sizler için en güzel dijital deneyimi yaratmak için buradayız.",
    },
    // Yeni kart: Değerlerimiz
    {
      title: "Değerlerimiz",
      description: (
        <ul className='list-disc list-inside space-y-1'>
          <li>Müşteri memnuniyeti</li>
          <li>Kalite</li>
          <li>İnovasyon</li>
          <li>Güven</li>
        </ul>
      ),
    },
  ];

  return (
    <>
      <PageHero
        title='Hakkımızda'
        subtitle='Kurumsal değerlerimiz ve misyonumuz hakkında bilgi edinin.'
      />

      <section className='py-20'>
        <div className='container mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className='border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 h-full'>
                <CardHeader>
                  <CardTitle className='text-xl font-bold'>
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-gray-700'>
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* İletişim çağrısı */}
        <div className='mt-12 flex flex-col items-center text-center'>
          <div className='bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 text-white px-6 py-4 rounded-2xl shadow-xl mb-4 inline-flex items-center gap-3 animate-pulse'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-white'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
            </svg>
            <h3 className='text-xl font-semibold'>Sizin İçin Buradayız</h3>
          </div>
          <p className='text-gray-700 max-w-md mb-6'>
            Bizimle iletişime geçin, size özel çözümlerimizi birlikte
            keşfedelim. Hızlı, güvenli ve keyifli bir süreç garantisi veriyoruz.
          </p>
          <Link
            href='/contact'
            className='inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-lg shadow-md hover:scale-105 transition-transform font-medium'
          >
            Bize Ulaşın
          </Link>
        </div>
      </section>
    </>
  );
}

export default AboutPageClient;
