import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import { Info, HelpCircle, BookOpen, MessageSquare, Shield, Clock } from 'lucide-react'

export default function UserHelpPage() {
  const guides = [
    {
      title: "Placing Orders",
      icon: <BookOpen className="text-primary" />,
      content: "Select your items, choose the service type (Dry Clean or Ironing), set a pickup time, and proceed to secure online payment."
    },
    {
      title: "Pickup & Delivery",
      icon: <Clock className="text-primary" />,
      content: "We operate from 8:30 AM to 8:00 PM, Monday to Saturday. Sundays are reserved for maintenance. Urgent orders carry a surcharge but get 24-hour priority."
    },
    {
      title: "Secure Payments",
      icon: <Shield className="text-primary" />,
      content: "All payments are processed securely via Paystack. Your funds are only settled once the order architecture is verified."
    },
    {
      title: "Support Protocol",
      icon: <MessageSquare className="text-primary" />,
      content: "Need assistance? Reach out to our facility manager via the contact details in your settings or dashboard footer."
    }
  ]

  return (
    <CustomerLayout>
      <div className="space-y-20 py-12">
        <div className="border-b border-border pb-12">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6 italic">Support Hub</h2>
          <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-tight">
            HELP & <br /><span className="font-light italic text-primary">INSTRUCTIONS</span>.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {guides.map((guide, i) => (
            <div key={i} className="bg-background p-12 space-y-8 hover:bg-secondary/20 transition-all duration-700">
              <div className="w-12 h-12 border border-border flex items-center justify-center">
                {guide.icon}
              </div>
              <h3 className="text-xl font-black text-foreground tracking-tighter uppercase">{guide.title}</h3>
              <p className="text-[11px] font-black text-muted-foreground uppercase tracking-widest leading-relaxed italic opacity-80">
                {guide.content}
              </p>
            </div>
          ))}
        </div>

        <div className="p-12 border border-primary bg-primary/5 text-center space-y-6">
          <HelpCircle className="mx-auto text-primary" size={32} />
          <h2 className="text-xs font-black text-primary uppercase tracking-[0.4em]">Still Need Assistance?</h2>
          <p className="text-[10px] font-black text-foreground uppercase tracking-widest italic">Our support desk is active during operational hours.</p>
        </div>
      </div>
    </CustomerLayout>
  )
}
