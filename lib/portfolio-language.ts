export const englishCategory = (category: string) => ({
  "すべて": "All projects", "ウェブサイト": "Websites", "ECサイト": "E-commerce", "ランディングページ": "Landing pages",
}[category] || category);
