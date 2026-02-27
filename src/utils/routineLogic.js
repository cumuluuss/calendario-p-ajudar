import { format, addHours, isBefore, isAfter, parse, startOfDay } from 'date-fns';

export const CHECK_INTERVAL_HOURS = 1;

export function hasOverlap(newRoutine, existingRoutines) {
  const newStart = parse(newRoutine.time, 'HH:mm', new Date());
  const newEnd = addHours(newStart, CHECK_INTERVAL_HOURS);

  for (const routine of existingRoutines) {
    // Basic check: if they are on the same "schedule"
    const sameDay = routine.type === 'daily' || newRoutine.type === 'daily' || 
                   (routine.type === newRoutine.type && routine.day === newRoutine.day);

    if (sameDay) {
      const existStart = parse(routine.time, 'HH:mm', new Date());
      const existEnd = addHours(existStart, CHECK_INTERVAL_HOURS);

      // Overlap or less than 1 hour difference
      if (
        (isBefore(newStart, existEnd) && isAfter(newEnd, existStart))
      ) {
        return routine;
      }
    }
  }
  return null;
}

export function getDayColor(date, routines) {
  const dayRoutines = routines.filter(r => {
    if (r.type === 'daily') return false; // Ignore daily for coloring as per request
    if (r.type === 'weekly') {
      return format(date, 'EEEE').toLowerCase() === r.day.toLowerCase();
    }
    if (r.type === 'monthly') {
      return format(date, 'd') === r.day;
    }
    return false;
  });

  if (dayRoutines.length === 0) return null;
  
  // Simple "sum" of colors or intensity
  const count = dayRoutines.length;
  if (count === 1) return 'bg-blue-200';
  if (count === 2) return 'bg-blue-400';
  return 'bg-blue-600';
}
