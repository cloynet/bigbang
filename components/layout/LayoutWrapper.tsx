"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import React from "react";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const ROOT_STATIC_PAGES = ["about", "contact", "products"];

// children'a tipi uygulayın
export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isSingleSegmentRoute = segments.length === 1;
  const firstSegment = segments[0];

  let shouldHide = false;

  if (isSingleSegmentRoute) {
    if (!ROOT_STATIC_PAGES.includes(firstSegment)) {
      shouldHide = true;
    }
  }

  return (
    <>
      {!shouldHide && <Navbar />}
      <main>{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
}
