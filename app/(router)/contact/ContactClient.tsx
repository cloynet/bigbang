"use client";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import PageHero from "@/components/common/PageHero";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactClientPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = (
      document.querySelector("#g-recaptcha-response") as HTMLInputElement
    )?.value;
    if (!token) {
      toast.error("Lütfen doğrulamayı tamamlayın!");
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ ENVIRONMENT VARIABLE KULLAN
      const API_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (data.success) {
        toast.success("Mesajınız başarıyla gönderildi.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        window.grecaptcha?.reset();
      } else {
        toast.error(data.error || "Doğrulama başarısız oldu!");
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };
  return (
    <>
      <PageHero
        title='Bizimle İletişime Geçin'
        subtitle='Sorularınız veya iş birlikleri için size sadece bir mesaj uzaklıktayız.'
      />
      <section className='py-20'>
        <div className='container mx-auto px-4 '>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='bg-gradient-t-br from-background to-card rounded-2xl shadow-xl p-8 border border-border hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-center'
            >
              <div className='absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl'></div>
              <div className='absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl'></div>

              <div className='relative z-10'>
                <h2 className='text-3xl font-bold mb-2'>Bize Ulaşın</h2>
                <p>Aşağıdaki formu doldurarak bize mesaj gönderebilirsiniz:</p>

                <form onSubmit={handleSubmit} className='space-y-6 mt-7'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
                    {/* Ad Soyad */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className='space-y-2'
                    >
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-foreground/80'
                      >
                        Adınız Soyadınız <span className='text-primary'>*</span>
                      </label>
                      <div className='relative'>
                        <Input
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className='pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12'
                          placeholder='Adınız Soyadınız'
                          aria-required='true'
                        />
                        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='18'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
                            <circle cx='12' cy='7' r='4'></circle>
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className='space-y-2'
                    >
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-foreground/80'
                      >
                        E-posta <span className='text-primary'>*</span>
                      </label>
                      <div className='relative'>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className='pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12'
                          placeholder='email@example.com'
                          aria-required='true'
                        />
                        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <rect
                              width='20'
                              height='16'
                              x='2'
                              y='4'
                              rx='2'
                            ></rect>
                            <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Konu */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className='space-y-2'
                  >
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium text-foreground/80'
                    >
                      Konu <span className='text-primary'>*</span>
                    </label>
                    <div className='relative'>
                      <Input
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className='pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12'
                        placeholder='Konu'
                      />
                      <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <rect
                            width='20'
                            height='16'
                            x='2'
                            y='4'
                            rx='2'
                          ></rect>
                          <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Mesaj */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className='space-y-2'
                  >
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-foreground/80'
                    >
                      Mesaj <span className='text-primary'>*</span>
                    </label>
                    <div className='relative'>
                      <Textarea
                        id='message'
                        name='message'
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className='bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl resize-none pl-12 pt-3'
                        placeholder='Mesajınız...'
                      />
                      <div className='absolute top-3 left-3 text-muted-foreground'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <rect
                            width='20'
                            height='16'
                            x='2'
                            y='4'
                            rx='2'
                          ></rect>
                          <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className='pt-4'
                  >
                    <div className='mb-5 -mt-5 md:scale-100 scale-75 origin-top-left'>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                        }
                      />
                    </div>
                    <Button
                      type='submit'
                      className='w-full h-14 text-base font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-primary/20 relative overflow-hidden group'
                      disabled={isSubmitting}
                    >
                      <span className='relative z-10 flex items-center justify-center'>
                        {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </div>
              <div></div>
            </motion.div>

            <div className='space-y-6'>
              {/* İletişim Bilgileri */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl shadow-xl p-8 mb-8 backdrop-blur-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500'
              >
                <h2 className='text-2xl font-bold mb-6'>İletişim Bilgileri</h2>
                <div className='space-y-6'>
                  <ContactItem
                    title='Email'
                    description='example@hotmail.com'
                    link='mailto:example@hotmail.com'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-envelope'
                      viewBox='0 0 16 16'
                    >
                      <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z' />
                    </svg>
                  </ContactItem>
                  <ContactItem
                    title='Eren Esenli'
                    description='+90 539 215 0895'
                    link='tel:+90 539 215 0895'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-whatsapp'
                      viewBox='0 0 16 16'
                    >
                      <path d='M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232' />
                    </svg>
                  </ContactItem>
                  <ContactItem
                    title='Instagram'
                    description='@example'
                    link='/'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect
                        x='2'
                        y='2'
                        width='20'
                        height='20'
                        rx='5'
                        ry='5'
                      ></rect>
                      <path d='M16 11.37a4 4 0 1 1-7.74 2.63 4 4 0 0 1 7.74-2.63z'></path>
                      <line x1='17.5' y1='6.5' x2='17.5' y2='6.5'></line>
                    </svg>
                  </ContactItem>
                  <ContactItem title='TikTok' description='@example' link='/'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-tiktok'
                      viewBox='0 0 16 16'
                    >
                      <path d='M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z' />
                    </svg>
                  </ContactItem>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface ContactItemProps {
  title: string;
  description: string;
  link?: string;
  children?: React.ReactNode;
}

function ContactItem({ title, description, link, children }: ContactItemProps) {
  return (
    <div className='flex items-start gap-4 group'>
      <div className='p-3 bg-primary/10 rounded-xl text-primary'>
        {children}
      </div>
      <div>
        <h4 className='text-lg font-semibold'>{title}</h4>
        {link ? (
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground hover:text-primary transition-colors'
          >
            {description}
          </a>
        ) : (
          <p className='text-muted-foreground'>{description}</p>
        )}
      </div>
    </div>
  );
}

export default ContactClientPage;
