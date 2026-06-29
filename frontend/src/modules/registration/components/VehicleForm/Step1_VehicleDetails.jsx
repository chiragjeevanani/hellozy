import React from 'react';
import FileUploadField from '../shared/FileUploadField';

export default function Step1_VehicleDetails({ register, errors, type, watch, setValue }) {
  const isPickup = type === 'pickup';
  const isBus = type === 'bus';
  const isERickshaw = type === 'e-rickshaw';

  const commercialPermit = watch('commercialPermit');
  const isFinanced = watch('financed');
  const carrier = watch('carrier');
  const hsrp = watch('hsrp');

  return (
    <div className="space-y-8 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Vehicle Number */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-stone-850">
            Vehicle Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. DL 1CA 1234"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.vehicleNumber ? 'border-red-400 bg-red-50/10' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('vehicleNumber', { required: 'Vehicle number is required' })}
          />
          {errors.vehicleNumber && <p className="text-xs font-bold text-red-500">{errors.vehicleNumber.message}</p>}
        </div>

        {/* Make Name */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-stone-850">
            Make / Manufacturer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Tata, Mahindra, Maruti"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.makeName ? 'border-red-400 bg-red-50/10' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('makeName', { required: 'Vehicle make is required' })}
          />
          {errors.makeName && <p className="text-xs font-bold text-red-500">{errors.makeName.message}</p>}
        </div>

        {/* Model Number */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-stone-850">
              Model Name / Number <span className="text-red-500">*</span>
            </label>
          </div>
          <input
            type="text"
            placeholder="e.g. Bolero, Swift, LPO 1618"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.modelNumber ? 'border-red-400 bg-red-50/10' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('modelNumber', { required: 'Model is required' })}
          />
          {errors.modelNumber && <p className="text-xs font-bold text-red-500">{errors.modelNumber.message}</p>}
        </div>

        {/* Color */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-stone-850">
            Vehicle Color <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. White, Black, Red"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.vehicleColor ? 'border-red-400 bg-red-50/10' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('vehicleColor', { required: 'Vehicle color is required' })}
          />
          {errors.vehicleColor && <p className="text-xs font-bold text-red-500">{errors.vehicleColor.message}</p>}
        </div>

        {/* Engine Number */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-stone-850">
              Engine Number <span className="text-red-500">*</span>
            </label>
          </div>
          <input
            type="text"
            placeholder="e.g. E1234567"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.engineNumber ? 'border-red-400 bg-red-50/10' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('engineNumber', { required: 'Engine number is required' })}
          />
          {errors.engineNumber && <p className="text-xs font-bold text-red-500">{errors.engineNumber.message}</p>}
        </div>

        {/* Chassis Number */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-stone-850">
              Chassis Number <span className="text-red-500">*</span>
            </label>
          </div>
          <input
            type="text"
            placeholder="e.g. C1234567"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.chassisNumber ? 'border-red-400 bg-red-50/10' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('chassisNumber', { required: 'Chassis number is required' })}
          />
          {errors.chassisNumber && <p className="text-xs font-bold text-red-500">{errors.chassisNumber.message}</p>}
        </div>

        {/* Fuel Type */}
        {!isERickshaw && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-bold text-stone-850">
                Fuel Type <span className="text-red-500">*</span>
              </label>
            </div>
            <select
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold bg-white focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent cursor-pointer ${
                errors.fuelType ? 'border-red-400 bg-red-50/10' : 'border-stone-200 hover:border-stone-300'
              }`}
              {...register('fuelType', { required: !isERickshaw ? 'Fuel type is required' : false })}
            >
              <option value="">Select Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="cng">CNG</option>
              <option value="petrol_cng">Petrol & CNG</option>
              <option value="diesel_cng">Diesel & CNG</option>
            </select>
            {errors.fuelType && <p className="text-xs font-bold text-red-500">{errors.fuelType.message}</p>}
          </div>
        )}

        {/* Seating Capacity */}
        {!isPickup && (
          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-850">
              Seating Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder={isBus ? "e.g. 40" : isERickshaw ? "e.g. 4" : "e.g. 5"}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
                errors.seatingCapacity ? 'border-red-400 bg-red-50/10' : 'border-stone-200 hover:border-stone-300'
              }`}
              {...register('seatingCapacity', { required: !isPickup ? 'Seating capacity is required' : false })}
            />
            {errors.seatingCapacity && <p className="text-xs font-bold text-red-500">{errors.seatingCapacity.message}</p>}
          </div>
        )}

        {/* Load Capacity & Dimensions (Pickup only) */}
        {isPickup && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-850">
                Load Capacity (Tons) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 1.5 Tons"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
                  errors.loadCapacity ? 'border-red-400 bg-red-50/10' : 'border-stone-200 hover:border-stone-300'
                }`}
                {...register('loadCapacity', { required: isPickup ? 'Load capacity is required' : false })}
              />
              {errors.loadCapacity && <p className="text-xs font-bold text-red-500">{errors.loadCapacity.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-850">
                Load Bed Dimensions <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 8ft x 5ft"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
                  errors.dimensions ? 'border-red-400 bg-red-50/10' : 'border-stone-200 hover:border-stone-300'
                }`}
                {...register('dimensions', { required: isPickup ? 'Dimensions are required' : false })}
              />
              {errors.dimensions && <p className="text-xs font-bold text-red-500">{errors.dimensions.message}</p>}
            </div>
          </>
        )}

        {/* Carrier (4-Wheeler, Bus, E-Rickshaw) */}
        {!isPickup && (
          <div className="space-y-3">
            <label className="block text-sm font-bold text-stone-850">
              Carrier Attached <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setValue('carrier', 'yes', { shouldValidate: true })}
                className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                  carrier === 'yes'
                    ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setValue('carrier', 'no', { shouldValidate: true })}
                className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                  carrier === 'no'
                    ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                No
              </button>
            </div>
            <input type="hidden" {...register('carrier', { required: 'Carrier selection is required' })} />
            {errors.carrier && <p className="text-xs font-bold text-red-500">{errors.carrier.message}</p>}
          </div>
        )}

        {/* HSRP Attached */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-stone-850">
              HSRP (High Security Plate) <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setValue('hsrp', 'yes', { shouldValidate: true })}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                hsrp === 'yes'
                  ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setValue('hsrp', 'no', { shouldValidate: true })}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                hsrp === 'no'
                  ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              No
            </button>
          </div>
          <input type="hidden" {...register('hsrp', { required: 'HSRP details required' })} />
          {errors.hsrp && <p className="text-xs font-bold text-red-500">{errors.hsrp.message}</p>}
        </div>

        {/* Financed Status */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-stone-850">
              Finance / Loan Status <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setValue('financed', 'yes', { shouldValidate: true })}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                isFinanced === 'yes'
                  ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              Financed
            </button>
            <button
              type="button"
              onClick={() => setValue('financed', 'no', { shouldValidate: true })}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                isFinanced === 'no'
                  ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              Cash / Paid Off
            </button>
          </div>
          <input type="hidden" {...register('financed', { required: 'Finance status required' })} />
          {errors.financed && <p className="text-xs font-bold text-red-500">{errors.financed.message}</p>}
        </div>

        {/* Commercial Permit */}
        {!isERickshaw && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-bold text-stone-850">
                Commercial Permit <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setValue('commercialPermit', 'yes', { shouldValidate: true })}
                className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                  commercialPermit === 'yes'
                    ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setValue('commercialPermit', 'no', { shouldValidate: true })}
                className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                  commercialPermit === 'no'
                    ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                No
              </button>
            </div>
            <input type="hidden" {...register('commercialPermit', { required: !isERickshaw ? 'Commercial permit status required' : false })} />
            {errors.commercialPermit && <p className="text-xs font-bold text-red-500">{errors.commercialPermit.message}</p>}
          </div>
        )}
      </div>

      {/* Conditional: Finance Fields */}
      {isFinanced === 'yes' && (
        <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-850">
              Financier Bank / Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. HDFC Bank, Cholamandalam"
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
                errors.financierName ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
              }`}
              {...register('financierName', { required: isFinanced === 'yes' ? 'Financier name is required' : false })}
            />
            {errors.financierName && <p className="text-xs font-bold text-red-500">{errors.financierName.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-850">
              Loan Booking / Agreement Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
                errors.financeDate ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
              }`}
              {...register('financeDate', { required: isFinanced === 'yes' ? 'Finance date is required' : false })}
            />
            {errors.financeDate && <p className="text-xs font-bold text-red-500">{errors.financeDate.message}</p>}
          </div>
        </div>
      )}

      {/* Conditional: Permit Upload */}
      {commercialPermit === 'yes' && (
        <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 animate-fadeIn">
          <FileUploadField
            label="Upload Commercial Permit Document *"
            value={watch('permitDoc')}
            onChange={(val) => setValue('permitDoc', val, { shouldValidate: true })}
            error={errors.permitDoc}
            isAdminOnly={true}
            helperText="PDF or Images accepted (Max 10MB)"
          />
        </div>
      )}
    </div>
  );
}
