import { Message } from "@/types";
import ClientHome from "./ClientHome";

async function fetchMessages(): Promise<Message[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${baseUrl}/api/projects`, {
      next: { revalidate: 10 },
    });
    if (!response.ok) throw new Error("Fetch failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return []; // Fallback to empty array
  }
}

export default async function Home() {
  const messages = await fetchMessages();
  return <ClientHome messages={messages} />;
}
