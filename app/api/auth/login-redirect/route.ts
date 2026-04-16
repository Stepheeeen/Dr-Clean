import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function GET() {
  const session = await auth()

  if (!session) {
    return redirect("/login")
  }

  const userRole = (session?.user as any)?.role

  if (userRole === "ADMIN") {
    return redirect("/admin/dashboard")
  }

  return redirect("/customer/dashboard")
}
