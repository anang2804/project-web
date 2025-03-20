import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email diperlukan!" },
        { status: 400 }
      );
    }

    const progress = await prisma.progress.findUnique({
      where: { email },
    });

    return NextResponse.json(progress || { completedLessons: [], progress: 0 });
  } catch (error) {
    console.error("❌ Error API progress:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan!" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { email, completedLessons, progress, lastLesson } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email diperlukan!" },
        { status: 400 }
      );
    }

    const updatedProgress = await prisma.progress.upsert({
      where: { email },
      update: { completedLessons, progress, lastLesson, updatedAt: new Date() },
      create: { email, completedLessons, progress, lastLesson },
    });

    return NextResponse.json(updatedProgress);
  } catch (error) {
    console.error("❌ Error updating progress:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui progress" },
      { status: 500 }
    );
  }
}
