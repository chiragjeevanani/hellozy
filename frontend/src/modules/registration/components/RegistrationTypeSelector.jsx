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
    id: 'four-wheeler',
    title: '4-Wheeler Owner',
    description: 'Hatchbacks, Sedans, SUVs & private cabs.',
    icon: Car,
    color: 'bg-amber-500/10 text-amber-700 hover:bg-amber-500/15',
  },
  {
    id: 'pickup',
    title: 'Pickup Owner',
    description: 'Loading trucks, commercial carriers & mini trucks.',
    icon: Truck,
    color: 'bg-orange-500/10 text-orange-700 hover:bg-orange-500/15',
  },
  {
    id: 'bus',
    title: 'Bus Owner',
    description: 'Mini-buses, standard buses & passenger coaches.',
    icon: Bus,
    color: 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/15',
  },
  {
    id: 'e-rickshaw',
    title: 'E-Rickshaw Owner',
    description: 'Eco-friendly electric rickshaws for local transit.',
    icon: Zap,
    color: 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15',
  },
  {
    id: 'hospital',
    title: 'Hospital / Clinic',
    description: 'Emergency tie-ups, ambulance services & diagnostics.',
    icon: Building2,
    color: 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/15',
  },
  {
    id: 'influencer',
    title: 'Brand Influencer',
    description: 'Promote green transit & win campaigns.',
    icon: Users,
    color: 'bg-purple-500/10 text-purple-700 hover:bg-purple-500/15',
  },
  {
    id: 'event-registration',
    title: 'Event Registration',
    description: 'Book seats as Bride, Groom, Sponsor, Visitor, Participate or Couple.',
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
