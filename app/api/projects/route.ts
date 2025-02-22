import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const { message } = await request.json();
  const newMessage = await prisma.message.create({
    data: {
      content: message,
    },
  });
  console.log("Saved:", newMessage);
  return NextResponse.json(
    { message: "Data received and saved!", data: newMessage },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const { id, content } = await request.json();
  const updatedMessage = await prisma.message.update({
    where: { id: Number(id) },
    data: { content },
  });
  console.log("Updated:", updatedMessage);
  return NextResponse.json(updatedMessage);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.message.delete({
    where: { id: Number(id) },
  });
  console.log("Deleted:", id);
  return NextResponse.json({ message: "Deleted!" });
}
