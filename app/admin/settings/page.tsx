import { AdminLayout } from '@/components/layouts/AdminLayout'
import { getSettings, updateSettings } from '@/lib/settings-actions'
import { SettingsForm } from '@/components/admin/SettingsForm'

export default async function AdminSettingsPage() {
  const settings = await getSettings()

  return (
    <AdminLayout>
      <div className="space-y-20 pb-20 max-w-5xl mx-auto">
        {/* Header - Architectural */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 italic">Settings</h2>
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">WEBSITE <br /><span className="font-light italic text-primary">SETTINGS</span>.</h1>
            <p className="mt-8 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] italic leading-relaxed">
              Update your website content and business contact information.
            </p>
          </div>
        </div>

        <SettingsForm initialSettings={settings} />
      </div>
    </AdminLayout>
  )
}
