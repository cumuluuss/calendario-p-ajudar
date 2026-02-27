import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  addMonths, 
  subMonths,
  isSameMonth,
  isSameDay
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getDayColor } from '../utils/routineLogic';

export default function Calendar({ routines }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <div className="space-x-2">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 border rounded">&lt;</button>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 border rounded">&gt;</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
          <div key={d} className="text-center font-bold text-sm p-1">{d}</div>
        ))}
        {days.map(day => {
          const colorClass = getDayColor(day, routines);
          const isCurrentMonth = isSameMonth(day, monthStart);
          
          return (
            <div 
              key={day.toString()} 
              className={`h-12 border p-1 text-xs transition-colors ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''} ${colorClass || ''}`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        * Rotinas diárias não alteram a cor dos dias.
      </div>
    </div>
  );
}
