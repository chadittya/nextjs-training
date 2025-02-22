import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json(); //parse incoming request body
  console.log("Received", body); //log it for now
  return NextResponse.json(
    { message: "Data received!", data: body },
    { status: 201 }
  );
}
