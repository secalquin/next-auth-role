import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
const baseUrl = process.env.NEXTAUTH_URL;

export default async function middleware(req) {
  const token = await getToken({ req, secret });
  const url = req.url;

  const { user } = token;

  console.log("isAdminURL:", url.includes(isAdmin));
  console.log("Rol: ", user.role.descriptionRole);
  if (url.includes(isAdmin)) {
    if (!user.role.descriptionRole.includes(["ADMINISTRATOR"])) {
      return NextResponse.redirect(`${baseUrl}/home`);
    }
  }

  return NextResponse.next();
}

const isAdmin = [`${baseUrl}/admin/users`];
