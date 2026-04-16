import { auth } from "@/auth"

export async function isAdmin() {
  const session = await auth()
  return (session?.user as any)?.role === "ADMIN"
}

export async function currentUser() {
  const session = await auth()
  return session?.user
}
