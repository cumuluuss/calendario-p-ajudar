import React, { useState } from 'react';

export default function RoutineForm({ onAdd }) {
  const [type, setType] = useState('daily');
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !time || (type !== 'daily' && !day)) {
      setError('Preencha todos os campos');
      return;
    }

    const result = onAdd({ type, name, day, time });
    if (result?.error) {
      setError(result.error);
    } else {
      setName('');
      setDay('');
      setTime('');
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h2 className="text-lg font-bold mb-4">Cadastrar Rotina</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tipo</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="daily">Diária</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensal</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {type !== 'daily' && (
          <div>
            <label className="block text-sm font-medium">
              {type === 'weekly' ? 'Dia da Semana' : 'Dia do Mês'}
            </label>
            {type === 'weekly' ? (
              <select value={day} onChange={(e) => setDay(e.target.value)} className="w-full p-2 border rounded">
                <option value="">Selecione</option>
                <option value="monday">Segunda</option>
                <option value="tuesday">Terça</option>
                <option value="wednesday">Quarta</option>
                <option value="thursday">Quinta</option>
                <option value="friday">Sexta</option>
                <option value="saturday">Sábado</option>
                <option value="sunday">Domingo</option>
              </select>
            ) : (
              <input 
                type="number" 
                min="1" max="31"
                value={day} 
                onChange={(e) => setDay(e.target.value)}
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">Horário</label>
          <input 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Adicionar
        </button>
      </form>
    </div>
  );
}
