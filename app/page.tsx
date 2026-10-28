import Portfolio from "@/components/portfolio";
export default function Home() {
  return <Portfolio directSend={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM)} />;
}
