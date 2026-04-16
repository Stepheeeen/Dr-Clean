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
export const sendOrderStatusEmail = async (
  email: string,
  orderNumber: string,
  status: string
) => {
  await resend.emails.send({
    from: "Dr. Clean Status <onboarding@resend.dev>",
    to: email,
    subject: `Order Update: #${orderNumber} is now ${status}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #1a1a1a; border: 1px solid #eeeeee;">
        <h2 style="text-transform: uppercase; letter-spacing: 0.4em; font-size: 10px; color: #2563eb; margin-bottom: 20px;">Protocol Update</h2>
        <h1 style="font-size: 32px; font-weight: 900; letter-spacing: -0.05em; margin-bottom: 40px; text-transform: uppercase;">Order <span style="font-weight: 300; font-style: italic;">#${orderNumber}</span>.</h1>
        <p style="font-size: 14px; line-height: 1.8; margin-bottom: 30px; letter-spacing: 0.02em;">
          Your engagement with our restoration facility has transitioned across states. 
          The current status is now officially recorded as:
        </p>
        <div style="padding: 24px; border: 1px solid #1a1a1a; text-align: center; margin-bottom: 40px;">
          <span style="font-size: 12px; font-weight: 900; letter-spacing: 0.5em; text-transform: uppercase;">${status}</span>
        </div>
        <p style="font-size: 11px; color: #666666; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 60px;">
          &copy; ${new Date().getFullYear()} Dr. Clean. Architectural Fabric Care.
        </p>
      </div>
    `
  });
};
export const sendAdminNewOrderEmail = async (
  adminEmail: string,
  orderNumber: string,
  customerName: string,
  total: number
) => {
  await resend.emails.send({
    from: "Dr. Clean System <onboarding@resend.dev>",
    to: adminEmail,
    subject: `New Order Received: #${orderNumber}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
        <h2 style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 12px; color: #2563eb;">New Protocol Initiated</h2>
        <h1 style="font-size: 24px; font-weight: 800; margin: 20px 0;">Order #${orderNumber}</h1>
        <p>A new order has been placed by <strong>${customerName}</strong>.</p>
        <div style="padding: 20px; background: #f8fafc; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;">Total Settlement Value:</p>
          <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: 800; color: #1e293b;">₦${total.toLocaleString()}</p>
        </div>
        <a href="${domain}/admin/orders" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 700;">View in Command Center</a>
      </div>
    `
  });
};
