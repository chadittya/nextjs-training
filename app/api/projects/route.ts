import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { message } = await request.json();
  const newMessage = await prisma.message.create({
    data: {
      content: message,
    },
  });
  console.log("Saved", newMessage);
  return NextResponse.json(
    { message: "Data received and saved!", data: newMessage },
    { status: 201 }
  );
}
