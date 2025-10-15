"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <footer className='bg-gray-100 border-t border-gray-300 py-20 text-gray-800'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Üst kısım */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-center md:text-left'>
          {/* Kısaca Biz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center md:items-start space-y-4 mx-auto md:mx-0 w-full'
          >
            {hasMounted && (
              <Link href='/' className='flex items-center space-x-2 mb-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 64 64'
                  width='36'
                  height='36'
                  fill='currentColor'
                  className='text-gray-700'
                >
                  <path d='M32 2 L36 24 L58 28 L36 32 L32 54 L28 32 L6 28 L28 24 Z' />
                </svg>
              </Link>
            )}
            <p className='text-gray-600 max-w-xs text-center md:text-left'>
              Sevdiklerinize özel, anlamlı ve unutulmaz hediyeler sunun.
              Kişiselleştirilebilir dijital deneyimler ile duygularınızı
              ölümsüzleştirin.
            </p>
          </motion.div>

          {/* Politikalar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='flex flex-col items-center md:items-start space-y-4'
          >
            <h3 className='text-lg font-bold mb-2 text-gray-800'>
              Politikalar
            </h3>
            <ul className='text-gray-600 text-sm space-y-1'>
              <li>
                <Link
                  href='/privacy'
                  className='hover:text-gray-800 transition-colors'
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href='/refund'
                  className='hover:text-gray-800 transition-colors'
                >
                  İade Politikası
                </Link>
              </li>
              <li>
                <Link
                  href='/distance-sale'
                  className='hover:text-gray-800 transition-colors'
                >
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
              <li>
                <Link
                  href='/payment-delivery'
                  className='hover:text-gray-800 transition-colors'
                >
                  Ödeme ve Teslimat
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Bağlantılar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex flex-col items-center md:items-start space-y-4'
          >
            <h3 className='text-lg font-bold mb-2 text-gray-800'>
              Bağlantılar
            </h3>
            <Link
              href='/'
              className='text-gray-600 hover:text-gray-800 transition-colors'
            >
              Anasayfa
            </Link>
            <Link
              href='/products'
              className='text-gray-600 hover:text-gray-800 transition-colors'
            >
              Tüm Ürünler
            </Link>
            <Link
              href='/about'
              className='text-gray-600 hover:text-gray-800 transition-colors'
            >
              Hakkımızda
            </Link>
            <Link
              href='/contact'
              className='text-gray-600 hover:text-gray-800 transition-colors'
            >
              İletişim
            </Link>
          </motion.div>

          {/* İletişim */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='flex flex-col items-center md:items-start space-y-4'
          >
            <h3 className='text-lg font-bold mb-2 text-gray-800'>İletişim</h3>
            <p className='text-gray-600 text-sm text-center md:text-left'>
              <span className='block'>✉️ example.com</span>
              <span className='block'>📞 0850 840 1765</span>
            </p>
            <Link
              href='/contact'
              className='text-gray-700 hover:underline transition-colors'
            >
              İletişim Sayfası →
            </Link>
          </motion.div>
        </div>

        {/* Alt kısım */}
        <div className='pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-gray-600 text-sm text-center md:text-left'>
            © {currentYear} Tüm hakları saklıdır.
          </p>
          <div className='flex justify-center space-x-6'>
            <Link
              href='/privacy'
              className='text-gray-600 hover:text-gray-800 transition-colors text-sm'
            >
              Gizlilik Politikası
            </Link>
            <Link
              href='/terms'
              className='text-gray-600 hover:text-gray-800 transition-colors text-sm'
            >
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
