import bcrypt from "bcrypt";

import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, name, password } = body;

  const email = userId;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await db.profile.create({
    data: {
      userId,
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
