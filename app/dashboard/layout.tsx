import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // Secure the route: Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b px-8 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-slate-800">Pagkakatipon System</h1>
        <div className="flex gap-6">
          <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            Attendance List
          </Link>
          <Link href="/dashboard/stats" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            Statistics
          </Link>
        </div>
      </nav>
      
      {/* Main Content Area (where your pages will load) */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}