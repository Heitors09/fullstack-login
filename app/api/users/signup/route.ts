import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, username, password } = body;
  console.log(body);
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  try {
    const post = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    console.log(post);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json("Register successfull", { status: 201 });
}
