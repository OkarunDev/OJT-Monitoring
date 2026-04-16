'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { addParticipant } from "@/app/actions"

export function AddParticipant() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Participant</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Participant</DialogTitle>
        </DialogHeader>
        <form action={async (formData) => {
          await addParticipant(formData)
          setOpen(false) // Closes modal after saving
        }} className="flex flex-col gap-4">
          <Input name="fullName" placeholder="e.g. Sophia Avila" required />
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}