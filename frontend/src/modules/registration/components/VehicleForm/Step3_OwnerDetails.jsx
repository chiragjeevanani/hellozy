import React from 'react';
import FileUploadField from '../shared/FileUploadField';

export default function Step3_OwnerDetails({ register, errors, watch, setValue }) {
  const ownerPhoto = watch('ownerPhoto');
  const vehiclePhoto = watch('vehiclePhoto');
  const isOwnerDriver = watch('isOwnerDriver');

  return (
    <div className="space-y-8 text-left">
      {/* Name, Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Owner Full Name */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-stone-850">
              Owner Full Name <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-500 border border-stone-200">Admin Only</span>
          </div>
          <input
            type="text"
            placeholder="e.g. Ramesh Kumar"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.ownerName ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('ownerName', { required: 'Owner name is required' })}
          />
          {errors.ownerName && <p className="text-xs font-bold text-red-500">{errors.ownerName.message}</p>}
        </div>

        {/* Owner Address */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-stone-850">
              Owner Address <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-500 border border-stone-200">Admin Only</span>
          </div>
          <input
            type="text"
            placeholder="e.g. H.No 123, Sector 15, Dwarka, Delhi"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.ownerAddress ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('ownerAddress', { required: 'Owner address is required' })}
          />
          {errors.ownerAddress && <p className="text-xs font-bold text-red-500">{errors.ownerAddress.message}</p>}
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-stone-850">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-accent border border-accent/25">Virtual Masked</span>
          </div>
          <input
            type="tel"
            placeholder="e.g. 9876543210"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.ownerMobile ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('ownerMobile', { 
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
          />
          {errors.ownerMobile && <p className="text-xs font-bold text-red-500">{errors.ownerMobile.message}</p>}
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-stone-850">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-500 border border-stone-200">Admin Only</span>
          </div>
          <input
            type="tel"
            placeholder="e.g. 9876543210"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.ownerWhatsapp ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('ownerWhatsapp', { 
              required: 'WhatsApp number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
          />
          {errors.ownerWhatsapp && <p className="text-xs font-bold text-red-500">{errors.ownerWhatsapp.message}</p>}
        </div>

        {/* Email ID */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-stone-850">
              Email ID <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-500 border border-stone-200">Admin Only</span>
          </div>
          <input
            type="email"
            placeholder="e.g. owner@example.com"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
              errors.ownerEmail ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
            }`}
            {...register('ownerEmail', { 
              required: 'Email ID is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Please enter a valid email address'
              }
            })}
          />
          {errors.ownerEmail && <p className="text-xs font-bold text-red-500">{errors.ownerEmail.message}</p>}
        </div>

        {/* Identifications Marks */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-850">
              ID Mark 1 <span className="text-stone-400 font-normal text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Mole on neck"
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 hover:border-stone-300 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent"
              {...register('idMark1')}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-850">
              ID Mark 2 <span className="text-stone-400 font-normal text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Scar on right hand"
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 hover:border-stone-300 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent"
              {...register('idMark2')}
            />
          </div>
        </div>
      </div>

      <hr className="border-stone-250/60 my-6" />

      {/* Upload Owner Photo & Vehicle Photo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FileUploadField
          label="Owner's Passport Photo *"
          value={ownerPhoto}
          onChange={(val) => setValue('ownerPhoto', val, { shouldValidate: true })}
          error={errors.ownerPhoto}
          isAdminOnly={true}
          helperText="Recent passport size photograph (JPEG/PNG)"
        />

        <FileUploadField
          label="Vehicle Photo (With Number Plate visible) *"
          value={vehiclePhoto}
          onChange={(val) => setValue('vehiclePhoto', val, { shouldValidate: true })}
          error={errors.vehiclePhoto}
          isAdminOnly={false}
          helperText="JPEG or PNG format (Max 10MB)"
        />
      </div>

      {/* Is Owner Driver? Toggle */}
      <div className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200/80 mt-8 space-y-4">
        <div className="text-left">
          <label className="block text-sm font-bold text-stone-850 mb-1">
            Will the Owner drive this vehicle? <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-stone-500 font-medium">
            If you are driving this vehicle yourself, we will reuse your owner photo and DL details for the public driver view. If someone else will drive, select "No" to enter their details on the next step.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setValue('isOwnerDriver', 'yes', { shouldValidate: true })}
            className={`flex-1 py-3.5 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
              isOwnerDriver === 'yes'
                ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            Yes, I will drive myself
          </button>
          <button
            type="button"
            onClick={() => setValue('isOwnerDriver', 'no', { shouldValidate: true })}
            className={`flex-1 py-3.5 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
              isOwnerDriver === 'no'
                ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            No, I have hired a driver
          </button>
        </div>
        <input type="hidden" {...register('isOwnerDriver', { required: 'Please specify if you will drive the vehicle' })} />
        {errors.isOwnerDriver && <p className="text-xs font-bold text-red-500">{errors.isOwnerDriver.message}</p>}
      </div>
    </div>
  );
}
