import React, { useState } from 'react';
import RoutineForm from './components/RoutineForm';
import Calendar from './components/Calendar';
import { hasOverlap } from './utils/routineLogic';

function App() {
  const [routines, setRoutines] = useState([]);

  const handleAddRoutine = (newRoutine) => {
    const overlap = hasOverlap(newRoutine, routines);
    if (overlap) {
      return { error: `Conflito de horário com a rotina: ${overlap.name}. Deve haver pelo menos 1h de diferença.` };
    }
    setRoutines([...routines, newRoutine]);
    return { success: true };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Gerenciador de Rotinas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <RoutineForm onAdd={handleAddRoutine} />
            
            <div className="mt-8 p-4 bg-white border rounded shadow-sm">
              <h2 className="text-lg font-bold mb-4">Suas Rotinas</h2>
              <ul className="space-y-2">
                {routines.map((r, i) => (
                  <li key={i} className="text-sm border-b pb-2">
                    <span className="font-bold">{r.name}</span> ({r.type})<br/>
                    <span className="text-gray-500">{r.day} às {r.time}</span>
                  </li>
                ))}
                {routines.length === 0 && <p className="text-gray-400">Nenhuma rotina cadastrada.</p>}
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Calendar routines={routines} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
