import React, { useState, useEffect } from 'react';
import { Search, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function RegistrationTable({ registrations, onSelectRow, selectedId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filtered, setFiltered] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Apply filters on updates
  useEffect(() => {
    let result = [...registrations];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(r => 
        r.id.toLowerCase().includes(term) ||
        (r.ownerName && r.ownerName.toLowerCase().includes(term)) ||
        (r.name && r.name.toLowerCase().includes(term)) ||
        (r.vehicleNumber && r.vehicleNumber.toLowerCase().includes(term)) ||
        (r.hospitalName && r.hospitalName.toLowerCase().includes(term)) ||
        (r.email && r.email.toLowerCase().includes(term))
      );
    }

    if (filterType !== 'all') {
      result = result.filter(r => r.type === filterType);
    }

    if (filterStatus !== 'all') {
      result = result.filter(r => r.status === filterStatus);
    }

    setFiltered(result);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterType, filterStatus, registrations]);

  // Pagination calculation
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs flex flex-col h-full">
      {/* Filter Section */}
      <div className="p-6 border-b border-stone-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-450" />
          <input
            type="text"
            placeholder="Search by ID, name, vehicle, email..."
            className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs font-semibold text-stone-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <select
            className="px-3 py-2.5 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs font-bold text-stone-650 cursor-pointer"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="four-wheeler">4-Wheeler</option>
            <option value="pickup">Pickup</option>
            <option value="bus">Bus</option>
            <option value="e-rickshaw">E-Rickshaw</option>
            <option value="hospital">Hospital</option>
            <option value="influencer">Influencer</option>
          </select>

          <select
            className="px-3 py-2.5 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs font-bold text-stone-650 cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="overflow-x-auto flex-grow">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-stone-50 text-[10px] uppercase font-extrabold tracking-wider text-stone-500 border-b border-stone-150">
              <th className="px-6 py-4">ID / Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Partner Entity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-150 text-xs">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr 
                  key={item.id}
                  className={`hover:bg-stone-50/50 transition-colors cursor-pointer ${
                    selectedId === item.id ? 'bg-accent/5 hover:bg-accent/5' : ''
                  }`}
                  onClick={() => onSelectRow(item)}
                >
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-stone-900 block">{item.id}</span>
                    <span className="text-[10px] text-stone-400 font-semibold">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-stone-650 capitalize">
                    {item.type.replace('-', ' ')}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-stone-850 block">
                      {item.hospitalName || item.ownerName || item.name}
                    </span>
                    <span className="text-[10px] text-stone-500 font-semibold truncate max-w-[180px] block">
                      {item.vehicleNumber || item.email || 'No key info'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectRow(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-16 text-center text-stone-400 font-bold">
                  No registrations found matching the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-stone-150 flex items-center justify-between bg-stone-50/50">
          <span className="text-xs text-stone-500 font-semibold">
            Showing <span className="font-bold text-stone-850">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-bold text-stone-850">{Math.min(indexOfLastItem, filtered.length)}</span> of{' '}
            <span className="font-bold text-stone-850">{filtered.length}</span> entries
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-stone-200 rounded-lg text-xs font-bold bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-stone-200 rounded-lg text-xs font-bold bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
