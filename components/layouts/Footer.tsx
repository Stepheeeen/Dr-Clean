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
                <a href="tel:+1234567890" className="hover:opacity-80 transition-opacity">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@drclean.com" className="hover:opacity-80 transition-opacity">
                  info@drclean.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Main Street, City, State 12345</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Hours</h4>
            <ul className="space-y-1 text-sm">
              <li>Monday - Friday: 7:00 AM - 7:00 PM</li>
              <li>Saturday: 9:00 AM - 5:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm text-primary-foreground/80">
            &copy; {currentYear} Dr. Clean Laundry Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
