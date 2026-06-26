import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRegistrations, updateRegistrationStatus } from '../../registration/utils/registrationStore';
import RegistrationTable from '../components/RegistrationTable';
import RegistrationDetailPanel from '../components/RegistrationDetailPanel';
import { FileText } from 'lucide-react';

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const list = getRegistrations();
    setRegistrations(list);
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    const success = updateRegistrationStatus(id, newStatus);
    if (success) {
      // Reload registrations
      const list = getRegistrations();
      setRegistrations(list);
      
      // Update selected item in view
      if (selected && selected.id === id) {
        setSelected({ ...selected, status: newStatus });
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Dashboard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow items-start">
        
        {/* Main Table view */}
        <div className={`lg:col-span-2 ${selected ? 'lg:col-span-2' : 'lg:col-span-3'} transition-all duration-300`}>
          <RegistrationTable 
            registrations={registrations} 
            onSelectRow={(row) => setSelected(row)}
            selectedId={selected?.id}
          />
        </div>

        {/* Details Panel Side Drawer */}
        <div className={`lg:col-span-1 h-full min-h-[500px] ${selected ? 'block' : 'hidden'}`}>
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <RegistrationDetailPanel 
                  selected={selected}
                  onClose={() => setSelected(null)}
                  onUpdateStatus={handleUpdateStatus}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
