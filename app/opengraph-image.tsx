import { ImageResponse } from "next/og";

export const alt = "OHO BROTHERS — Design and development, one team";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", background: "#f4f5f8", padding: 80, color: "#192235", borderBottom: "18px solid #4f46a5" }}><div style={{ fontSize: 24, letterSpacing: 5, color: "#4f46a5", marginBottom: 35 }}>DESIGN & ENGINEERING</div><div style={{ fontSize: 90, fontWeight: 700, lineHeight: 1.1 }}>OHO BROTHERS</div><div style={{ fontSize: 32, marginTop: 40 }}>Websites & systems for small teams.</div><div style={{ display: "flex", marginTop: 55, width: 180, height: 8, background: "#35366b", borderRadius: 8 }} /></div>, size);
}
