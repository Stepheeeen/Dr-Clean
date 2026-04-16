import { AdminLayout } from '@/components/layouts/AdminLayout'
import { Terminal, Database, ShieldCheck, Mail, Settings, LayoutDashboard } from 'lucide-react'

export default function AdminHelpPage() {
  const documentation = [
    {
      title: "Order Management",
      icon: <LayoutDashboard className="text-primary" />,
      content: "Track live orders, update statuses (Processing, Ready, Ready for Delivery), and manage financial settlements."
    },
    {
      title: "Settings Control",
      icon: <Settings className="text-primary" />,
      content: "Configure global headlines, contact emails, and operating hours. The system uses these for notifications and UI state."
    },
    {
      title: "Security Protocols",
      icon: <ShieldCheck className="text-primary" />,
      content: "Ensure all admin sessions are protected. Delete only unpaid/pending orders to maintain database integrity."
    },
    {
      title: "System Notifications",
      icon: <Mail className="text-primary" />,
      content: "Automated emails are sent to admins on new orders and to customers on status updates via Resend API."
    }
  ]

  return (
    <AdminLayout>
      <div className="space-y-20 py-12 max-w-5xl mx-auto">
        <div className="border-b border-border pb-12">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6 italic">Infrastructure Support</h2>
          <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-tight">
            COMMAND <br /><span className="font-light italic text-primary">MANUAL</span>.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {documentation.map((item, i) => (
            <div key={i} className="bg-background p-12 space-y-8 hover:bg-secondary/20 transition-all duration-700">
              <div className="w-12 h-12 border border-border flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-foreground tracking-tighter uppercase">{item.title}</h3>
              <p className="text-[11px] font-black text-muted-foreground uppercase tracking-widest leading-relaxed italic opacity-80">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <div className="p-12 border border-foreground bg-secondary/30 flex items-center gap-10">
          <div className="w-16 h-16 bg-primary flex items-center justify-center shrink-0">
            <Terminal className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-xs font-black text-foreground uppercase tracking-[0.3em] mb-2">Technical Registry</h2>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic leading-relaxed">
              If the system architecture requires manual intervention, consult the deployment logs on Vercel or your cloud provider.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
