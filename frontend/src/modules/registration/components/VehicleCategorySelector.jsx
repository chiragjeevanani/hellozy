import React from 'react';
import { 
  Car, 
  Truck, 
  Bus, 
  Zap, 
  ArrowLeft,
  Bike
} from 'lucide-react';

const VEHICLE_CATEGORIES = [
  {
    id: 'bike',
    title: 'Bike Onboarding',
    description: 'Register Motorcycles, Scooters, or Electric Two-Wheelers.',
    icon: Bike,
    color: 'bg-purple-500/10 text-purple-700 hover:bg-purple-500/15',
  },
  {
    id: 'three-wheeler',
    title: '3-Wheeler Onboarding',
    description: 'Register Auto Rickshaws, E-Rickshaws, or other local transit 3-wheelers.',
    icon: Zap,
    color: 'bg-amber-500/10 text-amber-700 hover:bg-amber-500/15',
  },
  {
    id: 'four-wheeler',
    title: '4-Wheeler Onboarding',
    description: 'Register Hatchbacks, Sedans, SUVs, Cabs, or personal 4-wheelers.',
    icon: Car,
    color: 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/15',
  },
  {
    id: 'pickup',
    title: 'Pickup Onboarding',
    description: 'Register commercial loading trucks, pickups, and carriers.',
    icon: Truck,
    color: 'bg-orange-500/10 text-orange-700 hover:bg-orange-500/15',
  },
  {
    id: 'bus',
    title: 'Bus Onboarding',
    description: 'Register passenger buses, mini-buses, or luxury coaches.',
    icon: Bus,
    color: 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15',
  },
];

export default function VehicleCategorySelector({ onSelect, onBack }) {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center space-x-2 mb-8">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 font-semibold cursor-pointer border-none bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Onboarding Types
        </button>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold text-primary font-display">
          Select Vehicle Category
        </h2>
        <p className="mt-3 text-stone-600 text-sm">
          Choose the category of vehicle you want to onboard. We'll guide you through the appropriate verification and registration steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VEHICLE_CATEGORIES.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className="text-left bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 group flex items-start space-x-5 cursor-pointer"
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
