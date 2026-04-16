'use server'

import { signIn, signOut } from "@/auth"
import { sendPasswordResetEmail } from "@/lib/mail"
import prisma from "@/lib/db"
import { generatePasswordResetToken } from "@/lib/tokens"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import { z } from "zod"

const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
})

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) return { error: "Invalid fields!" }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/api/auth/login-redirect",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." }
        default:
          return { error: "Something went wrong." }
      }
    }
    throw error
  }
}

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: "User created!" }
}

export async function logout() {
  await signOut()
}

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
})

const ResetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  token: z.string().min(1, "Token is required"),
})

export async function initiatePasswordReset(values: z.infer<typeof ForgotPasswordSchema>) {
  const validatedFields = ForgotPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid email!" }
  }

  const { email } = validatedFields.data

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (!existingUser) {
    return { error: "Email not found!" }
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  try {
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    )
  } catch (error) {
    console.error("Email error:", error)
    return { error: "Failed to send reset email." }
  }

  return { success: "Reset email sent!" }
}

export async function resetPassword(values: z.infer<typeof ResetPasswordSchema>) {
  const validatedFields = ResetPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { password, token } = validatedFields.data

  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  })

  if (!existingToken) {
    return { error: "Invalid token!" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: "Token has expired!" }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email },
  })

  if (!existingUser) {
    return { error: "Email does not exist!" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return { success: "Password updated!" }
}
