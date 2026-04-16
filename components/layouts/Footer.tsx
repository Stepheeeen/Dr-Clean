import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#111111] text-white mt-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="text-3xl font-black tracking-tighter mb-8">
              DR. CLEAN<span className="text-primary italic">.</span>
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mb-10">
              Redefining garment care through architectural precision and meticulous attention to detail. 
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                <Mail size={16} />
              </div>
              <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                <Phone size={16} />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1"></div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-primary mb-10">Directory</h4>
            <ul className="space-y-6 text-sm">
              {['Services', 'Pricing', 'About Us', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-muted-foreground hover:text-white transition-colors tracking-wide">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-primary mb-10">Presence</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex flex-col gap-2">
                <span className="text-white font-medium uppercase text-[10px] tracking-widest opacity-50">Headquarters</span>
                <span className="text-muted-foreground">Lagos & Abuja, Nigeria</span>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-white font-medium uppercase text-[10px] tracking-widest opacity-50">Inquiries</span>
                <a href="mailto:hello@dr-clean.com.ng" className="text-muted-foreground hover:text-white transition-colors">
                  hello@dr-clean.com.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            &copy; {currentYear} DR. CLEAN RESIDENCES. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-4">
            DESIGN BY 
            <a 
              href="https://flairtechlabs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white font-bold hover:text-primary transition-colors"
            >
              FLAIR TECHNOLOGIES
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
