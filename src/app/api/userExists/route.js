import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // Hanya mengambil ID user
    });

    console.log("User:", user);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error fetching user." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
