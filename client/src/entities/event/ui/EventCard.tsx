'use client';

import { Event } from '../model/types';
import { DeleteEventDialog } from '@/features/events/components/DeleteEventDialog';
import { EditEventDialog } from '@/features/events/components/EditEventDialog';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const time = new Date(event.date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const importanceStyles = {
    HIGH: 'bg-red-100 text-red-600',
    MEDIUM: 'bg-orange-100 text-orange-600',
    LOW: 'bg-green-100 text-green-600',
  };

  return (
    <li className="group p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all hover:shadow-md bg-white flex justify-between items-start">
      <div className="space-y-1">
        <h3 className="font-bold text-lg text-slate-800">{event.title}</h3>
        {event.description && (
          <p className="text-slate-500 text-sm line-clamp-1">{event.description}</p>
        )}
        <p className="text-blue-600 text-xs font-medium">{time}</p>
      </div>
      
      <div className="flex flex-col items-end justify-between h-full min-h-[4rem]">
        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${importanceStyles[event.importance]}`}>
          {event.importance}
        </span>
        
        <div className="flex gap-1 mt-2">
          <EditEventDialog event={event} />
          <DeleteEventDialog eventId={event.id} />
        </div>
      </div>
    </li>
  );
}
