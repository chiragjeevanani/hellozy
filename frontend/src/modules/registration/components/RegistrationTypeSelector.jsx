import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Truck, 
  Bus, 
  Zap, 
  Building2, 
  Users, 
  ArrowLeft,
  Calendar
} from 'lucide-react';

const REGISTRATION_OPTIONS = [
  {
    id: 'vehicle',
    title: 'Vehicle Partner Onboarding',
    description: 'Register Hatchbacks, Sedans, SUVs, Auto/e-Rickshaws, Pickups & Buses.',
    icon: Car,
    color: 'bg-amber-500/10 text-amber-700 hover:bg-amber-500/15',
  },
  {
    id: 'event-registration',
    title: 'Event Registration',
    description: 'Book seats for upcoming Hellozy events as Bride, Groom, Sponsor, Visitor, Participant, or Couple.',
    icon: Calendar,
    color: 'bg-rose-500/10 text-rose-700 hover:bg-rose-500/15',
  },
];

export default function RegistrationTypeSelector({ onSelect }) {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center space-x-2 mb-8">
        <Link 
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold text-primary font-display">
          Choose Registration Type
        </h2>
        <p className="mt-3 text-stone-600 text-sm">
          Select the option that best describes your profile. We'll guide you through our streamlined verification checklist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REGISTRATION_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className="text-left bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 group flex items-start space-x-5"
            >
              <div className={`p-4 rounded-xl shrink-0 ${opt.color} group-hover:scale-105 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-display">
                  {opt.title}
                </h3>
                <p className="text-stone-500 text-sm mt-1 leading-relaxed">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
