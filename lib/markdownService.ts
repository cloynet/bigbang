export interface Product {
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
  features: string[];
  color: string;
  delay?: number;
  image: string;
  formFields: {
    name: string;
    label: string;
    type: "text" | "textarea" | "file" | "date";
    required?: boolean;
    placeholder?: string;
    multiple?: boolean;
  }[];
}

export const products: Product[] = [
  {
    slug: "dijital-ani-sitesi",
    title: "Sevgilinizle Dijital Anı Sitesi",
    category: "anilar",
    description: "Aşkınızı dijital bir hatıraya dönüştürün 💞",
    content:
      "Sevgilinizle özel anılarınızı paylaşabileceğiniz, müzikle destekleyebileceğiniz kişisel bir dijital hediye.",
    features: [
      "Sizi anlatan şarkı eşliğinde",
      "Anı galerisi oluşturma",
      "1 adet AI sarılma görseli",
      "Romantik tasarım teması",
    ],
    color: "from-pink-400/20 to-rose-200/5",
    image: "/a4.jpeg",
    formFields: [
      { name: "aniBaslik", label: "Anı Başlığı", type: "text", required: true },
      { name: "ad", label: "Adınız", type: "text", required: true },
      {
        name: "sevgiliAd",
        label: "Sevgilinizin Adı",
        type: "text",
        required: true,
      },
      {
        name: "cocuklukFoto1",
        label: "Çocukluk Fotoğrafı 1",
        type: "file",
        required: true,
      },
      {
        name: "cocuklukFoto2",
        label: "Çocukluk Fotoğrafı 2",
        type: "file",
        required: true,
      },
      {
        name: "metinAlani1",
        label: "Metin Alanı 1",
        type: "text",
        required: true,
      },
      {
        name: "metinAlani2",
        label: "Metin Alanı 2",
        type: "text",
        required: true,
      },
      {
        name: "metinAlani3",
        label: "Metin Alanı 3",
        type: "text",
        required: true,
      },
      {
        name: "metinAlani4",
        label: "Metin Alanı 4",
        type: "text",
        required: true,
      },
      {
        name: "galeri",
        label:
          "Galeri Fotoğrafları (ilk 4 fotoğraf ana alanda, 4-10 fotoğraf yükleyin)",
        type: "file",
        required: true,
        multiple: true,
      },
      {
        name: "muzik",
        label: "Müziğinizin ismi veya linki",
        type: "text",
        required: true,
      },
      {
        name: "not",
        label: "Satıcıya Notunuz",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    slug: "dijital-davetiye",
    title: "Dijital E-Davetiye Paketi",
    category: "edavetiye",
    description: "Düğününüze modern ve unutulmaz bir dokunuş.",
    content:
      "AI destekli görseller, müzikli davetiye sayfaları, güvenli takı sistemi ve tek tıkla paylaşılabilir tasarım.",
    features: [
      "Müzikli davetiye sayfaları",
      "Fotoğraf & video toplama",
      "QR kodlu davetiye",
    ],
    color: "from-indigo-400/20 to-purple-300/5",
    delay: 0.6,
    image: "/a4.jpeg",
    formFields: [
      { name: "gelin", label: "Gelin Adı", type: "text", required: true },
      { name: "damat", label: "Damat Adı", type: "text", required: true },
      { name: "tarih", label: "Düğün Tarihi", type: "date", required: true },
      { name: "konum", label: "Konum", type: "text", required: true },
    ],
  },
];
