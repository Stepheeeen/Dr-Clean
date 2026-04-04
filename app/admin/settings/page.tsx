'use client'

import { AdminLayout } from '@/components/layouts/AdminLayout'
import { WEBSITE_CONTENT } from '@/lib/mock-data'
import { useState } from 'react'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Website Settings</h2>

        {/* Hero Section */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Headline</label>
              <input
                type="text"
                defaultValue={WEBSITE_CONTENT.hero.headline}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Subheadline</label>
              <input
                type="text"
                defaultValue={WEBSITE_CONTENT.hero.subheadline}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">About Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Headline</label>
              <input
                type="text"
                defaultValue={WEBSITE_CONTENT.about.headline}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
              <textarea
                defaultValue={WEBSITE_CONTENT.about.description}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24"
              />
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="+1 (234) 567-890"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <input
                type="email"
                defaultValue="info@drclean.com"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
              <input
                type="text"
                defaultValue="123 Main Street, City, State 12345"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Business Hours</h3>
          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="flex items-center gap-4">
                <label className="w-24 font-medium text-foreground">{day}</label>
                <input
                  type="time"
                  defaultValue={day === 'Sunday' ? '00:00' : '07:00'}
                  className="px-3 py-2 border border-border rounded-lg"
                />
                <span className="text-muted-foreground">to</span>
                <input
                  type="time"
                  defaultValue={day === 'Saturday' ? '17:00' : day === 'Sunday' ? '00:00' : '19:00'}
                  className="px-3 py-2 border border-border rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            Save Changes
          </button>
          {saved && (
            <p className="text-green-600 text-sm font-semibold flex items-center gap-2">
              ✓ Changes saved successfully
            </p>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
