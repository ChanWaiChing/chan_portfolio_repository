import { ImageResponse } from "next/og";

export const alt = "OHO BROTHERS — Design, Engineering & AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", background: "#f5f3ed", padding: 80, color: "#293d3c", borderBottom: "18px solid #456d70" }}><div style={{ fontSize: 24, letterSpacing: 5, color: "#456d70", marginBottom: 35 }}>DESIGN × ENGINEERING × AI</div><div style={{ fontSize: 90, fontWeight: 700, lineHeight: 1.1 }}>OHO BROTHERS</div><div style={{ fontSize: 32, marginTop: 40 }}>Two perspectives. One creative team.</div><div style={{ display: "flex", marginTop: 55, width: 180, height: 8, background: "#456958", borderRadius: 8 }} /></div>, size);
}
