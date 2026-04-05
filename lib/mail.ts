import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `${domain}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "Dr. Clean <onboarding@resend.dev>", // Default Resend test address
    to: email,
    subject: "Reset your password - Dr. Clean",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
        <h1 style="color: #2563eb; font-size: 24px; font-weight: 800; tracking: -0.025em; margin-bottom: 16px;">Dr. Clean</h1>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">Someone requested a password reset for your account. If this wasn't you, you can safely ignore this email.</p>
        <div style="margin-bottom: 32px;">
          <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block;">Reset Password</a>
        </div>
        <p style="font-size: 14px; color: #64748b;">This link expires in 1 hour.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
        <p style="font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} Dr. Clean. Premium Laundry & Dry Cleaning.</p>
      </div>
    `
  });
};
