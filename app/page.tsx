import { Message } from "@/types";
import ClientHome from "./ClientHome";

async function fetchMessages(): Promise<Message[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/projects`, {
    next: { revalidate: 10 }, // Refresh every 10s
  });
  const data = await response.json();
  return data;
}

export default async function Home() {
  const messages = await fetchMessages();
  return <ClientHome messages={messages} />;
}
