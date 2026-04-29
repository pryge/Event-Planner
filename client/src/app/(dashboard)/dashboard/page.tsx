'use client';

import { useState, useMemo } from 'react';
import { importance } from '@/entities/event/model/types';
import { Input } from '@/shared/ui/input';
import { Search, CalendarDays } from 'lucide-react';
import { useEvents } from '@/features/events/model/useEvents';
import { Header } from '@/widgets/header/ui/Header';
import { Calendar } from '@/shared/ui/calendar';
import { EventCard } from '@/entities/event/ui/EventCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { CreateEventDialog } from '@/features/events/components/CreateEventDialog';

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [importanceFilter, setImportanceFilter] = useState<importance | undefined>();
  
  const { data: events, isLoading } = useEvents(importanceFilter, search);

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    return events.filter(event => {
      if (!selectedDate) return true;
      return new Date(event.date).toDateString() === selectedDate.toDateString();
    });
  }, [events, selectedDate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Calendar</h1>
          
          <div className="flex items-center gap-3 w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search events..." 
                className="pl-10 bg-white border-none shadow-sm focus-visible:ring-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <CreateEventDialog defaultDate={selectedDate} />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full"
              />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-semibold mb-3">Filters</h3>
              <div className="space-y-2">
                <label className="text-sm text-slate-500">Importance</label>
                <Select 
                  value={importanceFilter || 'ALL'} 
                  onValueChange={(val) => setImportanceFilter(val === 'ALL' ? undefined : val as importance)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All events</SelectItem>
                    <SelectItem value="LOW">Normal</SelectItem>
                    <SelectItem value="MEDIUM">Important</SelectItem>
                    <SelectItem value="HIGH">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[500px]">
              <header className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {selectedDate?.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) || 'All Events'}
                </h2>
              </header>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-xl" />)}
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <CalendarDays className="w-12 h-12 mb-4 opacity-10" />
                  <p>No plans for this day</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {filteredEvents.map(event => <EventCard key={event.id} event={event} />)}
                </ul>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
