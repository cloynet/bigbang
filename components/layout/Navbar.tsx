"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";
interface NavBarProps {
  onMobileMenuChange?: (open: boolean) => void;
}

function NavBar({ onMobileMenuChange }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof onMobileMenuChange === "function") {
      onMobileMenuChange(mobileMenuOpen);
    }
  }, [mobileMenuOpen, onMobileMenuChange]);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const navLinks = [
    { name: "Anasayfa", path: "/" },
    { name: "Ürünlerimiz", path: "/products" },
    { name: "Hakkımızda", path: "/about" },
    { name: "İletişim", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 py-4 backdrop-blur-lg bg-white/10 border-b ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className='container mx-auto px-4 flex justify-between items-center'>
          <Link
            href='/'
            className='flex items-center space-x-2 xl:min-w-[266px]'
          >
            LOGO
          </Link>

          <div className='hidden lg:flex items-center justify-center space-x-6'>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-4 py-2 transition-colors ${
                  pathname === link.path
                    ? "text-primary font-semibold"
                    : "hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {/* Mobile menu button */}
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleMobileMenu}
            className='lg:hidden hover:bg-accent'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </Button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='fixed inset-0 z-50 bg-background flex flex-col lg:hidden'>
          <div className='container mx-auto p-4 flex justify-between items-center border-b'>
            <Link
              href='/'
              className='flex items-center space-x-2'
              onClick={() => setMobileMenuOpen(false)}
            >
              LOGO
            </Link>
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleMobileMenu}
              className='hover:bg-accent'
            >
              <X className='h-6 w-6' />
            </Button>
          </div>

          <div className='flex flex-col items-center justify-center h-full space-y-8 px-4'>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className='relative text-2xl font-medium hover:text-primary transition-colors py-2'
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.span
                    layoutId='activeMobileIndicator'
                    className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
