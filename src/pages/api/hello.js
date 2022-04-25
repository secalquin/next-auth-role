import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  console.log("JSON Web Token", token);

  if (token) {
    res.status(200).json({ name: "John Doe", token });
  } else {
    res.status(200).json({ error: "Permission Denied" });
  }
}
