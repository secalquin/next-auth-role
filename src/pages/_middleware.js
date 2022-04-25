import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
const baseUrl = process.env.NEXTAUTH_URL;

export default async function middleware(req) {
  const token = await getToken({ req, secret });
  const url = req.url;

  if (url.includes(requireAuth)) {
    if (!token) {
      return NextResponse.redirect(`${baseUrl}/auth/login`);
    }
  }

  return NextResponse.next();
}

const requireAuth = [`${baseUrl}/home`];
