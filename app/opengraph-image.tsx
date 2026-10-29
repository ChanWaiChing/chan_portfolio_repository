import { ImageResponse } from "next/og";

export const alt = "大穂兄弟。デザインと開発を、ひとつのチームで。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", background: "#fbfcfd", padding: 80, color: "#173047", borderBottom: "18px solid #176ba4" }}><div style={{ fontSize: 24, letterSpacing: 5, color: "#176ba4", marginBottom: 35 }}>デザインと開発</div><div style={{ fontSize: 90, fontWeight: 700, lineHeight: 1.1 }}>大穂兄弟</div><div style={{ fontSize: 32, marginTop: 40 }}>デザインと開発を、ひとつのチームで。</div><div style={{ display: "flex", marginTop: 55, width: 180, height: 8, background: "#145178", borderRadius: 8 }} /></div>, size);
}
