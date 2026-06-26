import React from 'react';
import FileUploadField from '../shared/FileUploadField';

export default function Step2_OfficerDetails({ register, errors, watch, setValue }) {
  return (
    <div className="space-y-8">
      {/* Owner Details Card */}
      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-stone-900 font-display uppercase tracking-wider">
            1. Hospital Owner / Managing Director Details
          </h4>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-200 text-stone-600 font-display">
            Admin Only
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Owner Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Rajesh Goel"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.ownerName ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('ownerName', { required: 'Owner name is required' })}
            />
            {errors.ownerName && <p className="text-xs font-semibold text-red-500 mt-1">{errors.ownerName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Owner Mobile Number *
            </label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.ownerMobile ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('ownerMobile', { 
                required: 'Owner mobile is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Must be a 10-digit number' }
              })}
            />
            {errors.ownerMobile && <p className="text-xs font-semibold text-red-500 mt-1">{errors.ownerMobile.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Owner Email ID *
            </label>
            <input
              type="email"
              placeholder="e.g. owner@cityhospital.com"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.ownerEmail ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('ownerEmail', { 
                required: 'Owner email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email ID' }
              })}
            />
            {errors.ownerEmail && <p className="text-xs font-semibold text-red-500 mt-1">{errors.ownerEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Owner Residential/Office Address *
            </label>
            <input
              type="text"
              placeholder="e.g. Sector-4, Dwarka, New Delhi"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.ownerAddress ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('ownerAddress', { required: 'Owner address is required' })}
            />
            {errors.ownerAddress && <p className="text-xs font-semibold text-red-500 mt-1">{errors.ownerAddress.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
          <FileUploadField
            label="Owner's Aadhar Card Doc *"
            value={watch('ownerAadhar')}
            onChange={(val) => setValue('ownerAadhar', val, { shouldValidate: true })}
            error={errors.ownerAadhar}
            isAdminOnly={true}
          />

          <FileUploadField
            label="Owner's Passport Photo *"
            value={watch('ownerPhoto')}
            onChange={(val) => setValue('ownerPhoto', val, { shouldValidate: true })}
            error={errors.ownerPhoto}
            isAdminOnly={true}
          />
        </div>
      </div>

      {/* Admin Officer Details Card */}
      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-stone-900 font-display uppercase tracking-wider">
            2. Administrative Officer (Contact Person) Details
          </h4>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-200 text-stone-600 font-display">
            Admin Only
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Officer Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Mr. Anil Sharma"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.officerName ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('officerName', { required: 'Officer name is required' })}
            />
            {errors.officerName && <p className="text-xs font-semibold text-red-500 mt-1">{errors.officerName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Officer Mobile Number *
            </label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.officerMobile ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('officerMobile', { 
                required: 'Officer mobile is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Must be a 10-digit number' }
              })}
            />
            {errors.officerMobile && <p className="text-xs font-semibold text-red-500 mt-1">{errors.officerMobile.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Officer Email ID *
            </label>
            <input
              type="email"
              placeholder="e.g. admin@cityhospital.com"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.officerEmail ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('officerEmail', { 
                required: 'Officer email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email ID' }
              })}
            />
            {errors.officerEmail && <p className="text-xs font-semibold text-red-500 mt-1">{errors.officerEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Officer Residential/Office Address *
            </label>
            <input
              type="text"
              placeholder="e.g. Rohini Sec-11, Delhi"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.officerAddress ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('officerAddress', { required: 'Officer address is required' })}
            />
            {errors.officerAddress && <p className="text-xs font-semibold text-red-500 mt-1">{errors.officerAddress.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
          <FileUploadField
            label="Officer's Aadhar Card Doc *"
            value={watch('officerAadhar')}
            onChange={(val) => setValue('officerAadhar', val, { shouldValidate: true })}
            error={errors.officerAadhar}
            isAdminOnly={true}
          />

          <FileUploadField
            label="Officer's Passport Photo *"
            value={watch('officerPhoto')}
            onChange={(val) => setValue('officerPhoto', val, { shouldValidate: true })}
            error={errors.officerPhoto}
            isAdminOnly={true}
          />
        </div>
      </div>
    </div>
  );
}
