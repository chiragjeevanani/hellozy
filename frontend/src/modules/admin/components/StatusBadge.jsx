import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function StatusBadge({ status }) {
  switch (status) {
    case 'Approved':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle className="w-3.5 h-3.5" /> Approved
        </span>
      );
    case 'Rejected':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
          <XCircle className="w-3.5 h-3.5" /> Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
          <Clock className="w-3.5 h-3.5" /> Pending
        </span>
      );
  }
}
