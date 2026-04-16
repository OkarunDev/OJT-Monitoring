'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { addEvent } from "@/app/actions"

export function AddEvent() {
  const[open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Pagkakatipon</DialogTitle>
        </DialogHeader>
        <form action={async (formData) => {
          await addEvent(formData)
          setOpen(false)
        }} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Event Type</label>
            {/* We use a simple dropdown for the event types from your spreadsheet */}
            <select name="eventType" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2" required>
              <option value="PBB">PBB</option>
              <option value="SPBB">SPBB</option>
              <option value="Prayer Meeting">Prayer Meeting</option>
              <option value="Mass Indoctrination">Mass Indoctrination</option>
              <option value="Worship Service">Worship Service (WS)</option>
              <option value="General Assembly">General Assembly (GA)</option>
              <option value="Special Gathering">Special Gathering (SG)</option>
              <option value="MCGI Cares">MCGI Cares</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Date</label>
            <Input type="date" name="eventDate" required />
          </div>

          <Button type="submit" className="mt-2">Save Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}