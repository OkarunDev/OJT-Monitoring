import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  
  // This is our Server Action (Controller) that handles the login
  const signIn = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Invalid email or password')
    }

    // If successful, go to the dashboard!
    return redirect('/dashboard')
  }

  // This is our View (The UI)
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Sign in to manage Pagkakatipon attendance.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signIn} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            
            {/* Show error message if login fails */}
            {searchParams?.message && (
              <p className="text-sm text-red-500 text-center">{searchParams.message}</p>
            )}

            <Button type="submit" className="w-full mt-2">Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}