import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-2">Dr. Clean</h3>
            <p className="text-primary-foreground/80 text-sm">
              Premium laundry and dry cleaning services with pickup and delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:opacity-80 transition-opacity">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:opacity-80 transition-opacity">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-80 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:opacity-80 transition-opacity">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+2348000000000" className="hover:opacity-80 transition-opacity">
                  +234 (800) 000-0000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:hello@dr-clean.com.ng" className="hover:opacity-80 transition-opacity">
                  hello@dr-clean.com.ng
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Lagos & Abuja, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Hours</h4>
            <ul className="space-y-1 text-sm">
              <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
              <li>Saturday: 9:00 AM - 5:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
          <p className="text-center md:text-left order-2 md:order-1">
            &copy; {currentYear} Dr. Clean Laundry Services. All rights reserved.
          </p>
          <p className="text-center md:text-right order-1 md:order-2">
            Built by{" "}
            <a 
              href="https://flairtechlabs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:text-white underline underline-offset-4 transition-colors"
            >
              Flair Technologies LTD
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
