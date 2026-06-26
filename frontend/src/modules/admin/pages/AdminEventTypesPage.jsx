import React, { useState, useEffect } from 'react';
import { getEventTypes, saveEventType } from '../../registration/utils/registrationStore';
import { Plus, Tag, AlertCircle } from 'lucide-react';

export default function AdminEventTypesPage() {
  const [eventTypes, setEventTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setEventTypes(getEventTypes());
  }, []);

  const handleAddType = (e) => {
    e.preventDefault();
    if (!newType.trim()) {
      setError('Event type name cannot be empty.');
      return;
    }
    
    const formatted = newType.trim();
    if (eventTypes.some(t => t.toLowerCase() === formatted.toLowerCase())) {
      setError('Event type already exists.');
      return;
    }

    const updated = saveEventType(formatted);
    setEventTypes(updated);
    setNewType('');
    setError('');
  };

  return (
    <div className="max-w-2xl space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-extrabold text-primary font-display">Event Types</h2>
        <p className="text-xs text-stone-500 font-semibold mt-1">Configure categories of events that organizers can host.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Add Type Form */}
        <div className="bg-white p-6 border border-stone-200 rounded-3xl shadow-xs md:col-span-1">
          <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-1.5">
            <Plus size={16} className="text-accent" /> Add Category
          </h3>
          <form onSubmit={handleAddType} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Type Name</label>
              <input
                type="text"
                placeholder="e.g. Exhibitions"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent"
                value={newType}
                onChange={(e) => { setNewType(e.target.value); setError(''); }}
              />
            </div>
            {error && (
              <div className="text-[10px] text-red-650 font-bold flex items-center gap-1">
                <AlertCircle size={12} /> {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Add Type
            </button>
          </form>
        </div>

        {/* Existing Categories List */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs md:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5 border-b pb-2">
            <Tag size={16} className="text-stone-400" /> Current Event Categories ({eventTypes.length})
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {eventTypes.map((type, idx) => (
              <div
                key={idx}
                className="p-3 bg-stone-50/50 border border-stone-150 rounded-2xl flex items-center gap-2.5 hover:bg-stone-50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-semibold text-stone-750">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
