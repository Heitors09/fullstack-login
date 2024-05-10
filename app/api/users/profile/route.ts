import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/hooks/getDataFromToken";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    console.log(userId);

    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
