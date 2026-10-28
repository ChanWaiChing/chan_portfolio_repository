// Public contact URL only. Do not put credentials here.
export const site = {
  name: "大穂兄弟",
  contactUrl: process.env.NEXT_PUBLIC_CONTACT_URL || "mailto:cbnbc07@gmail.com",
  contactImage: {
    src: "/images/contact-placeholder.webp",
    width: 1920,
    height: 640,
    alt: "明るい制作スタジオで、人とロボットが一緒にアイデアを形にするイメージ",
  },
};

export const contactMethods = [
  { id: "mail", label: "Mail", value: "cbnbc07@gmail.com", href: "mailto:cbnbc07@gmail.com" },
  { id: "chatwork", label: "Chatwork", value: "3htt4mii70cg8", href: "https://www.chatwork.com/3htt4mii70cg8" },
  { id: "discord", label: "Discord", value: "shiner715.", href: null },
  { id: "telegram", label: "Telegram", value: "@shiningstar1997", href: "https://t.me/shiningstar1997" },
] as const;
