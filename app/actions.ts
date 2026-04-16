'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Action to save a new participant
export async function addParticipant(formData: FormData) {
  const fullName = formData.get('fullName') as string
  const supabase = await createClient()
  
  await supabase.from('participants').insert({ full_name: fullName })
  
  // This tells Next.js to instantly refresh the dashboard table!
  revalidatePath('/dashboard') 
}

// Action to save a new Pagkakatipon event
export async function addEvent(formData: FormData) {
  const eventType = formData.get('eventType') as string
  const eventDate = formData.get('eventDate') as string
  const supabase = await createClient()
  
  await supabase.from('events').insert({ 
    event_type: eventType, 
    event_date: eventDate 
  })
  
  revalidatePath('/dashboard')
}