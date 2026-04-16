import { createClient } from '@/utils/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AddParticipant } from '@/components/AddParticipant'
import { AddEvent } from '@/components/AddEvent'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Fetch data
  const { data: participants } = await supabase.from('participants').select('*').order('full_name')
  const { data: events } = await supabase.from('events').select('*').order('event_date', { ascending: true })

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Completion Pagkatipon Batch 2 OJT</h2>
        <div className="flex gap-3">
          {/* Our new working buttons! */}
          <AddParticipant />
          <AddEvent />
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead className="w-[200px] font-bold">Pagkakatipon</TableHead>
                <TableHead className="w-[150px] font-bold">Date</TableHead>
                {participants?.map((participant) => (
                  <TableHead key={participant.id} className="text-center font-bold">
                    {participant.full_name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {events?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-10 text-slate-500">
                    No events found. Click "Add Event" to start.
                  </TableCell>
                </TableRow>
              ) : (
                events?.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.event_type}</TableCell>
                    {/* Formats date to match your spreadsheet (MM/DD/YYYY) */}
                    <TableCell>{new Date(event.event_date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</TableCell>
                    
                    {participants?.map((participant) => (
                      <TableCell key={participant.id} className="text-center">
                        —
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}