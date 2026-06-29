import React from 'react';
import FileUploadField from '../shared/FileUploadField';

export default function Step1_HospitalDetails({ register, errors, watch, setValue }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hospital Name */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Hospital / Clinic Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Apollo Hospital, City Clinic"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.hospitalName ? 'border-red-500 bg-red-50/10' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('hospitalName', { required: 'Hospital/Clinic name is required' })}
          />
          {errors.hospitalName && <p className="text-xs font-semibold text-red-500 mt-1">{errors.hospitalName.message}</p>}
        </div>

        {/* Hospital Address */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Hospital / Clinic Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 12, Park Street, Connaught Place, New Delhi"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.hospitalAddress ? 'border-red-500 bg-red-50/10' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('hospitalAddress', { required: 'Hospital/Clinic address is required' })}
          />
          {errors.hospitalAddress && <p className="text-xs font-semibold text-red-500 mt-1">{errors.hospitalAddress.message}</p>}
        </div>

        {/* GST Registration */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            GSTIN Number *
          </label>
          <input
            type="text"
            placeholder="e.g. 07AAAAA1111A1Z1"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.gstNumber ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('gstNumber', { required: 'GSTIN is required' })}
          />
          {errors.gstNumber && <p className="text-xs font-semibold text-red-500 mt-1">{errors.gstNumber.message}</p>}
        </div>

        {/* PAN Registration */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            PAN Number *
          </label>
          <input
            type="text"
            placeholder="e.g. ABCDE1234F"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.panNumber ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('panNumber', { 
              required: 'PAN number is required',
              pattern: {
                value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                message: 'Please enter a valid PAN format (e.g. ABCDE1234F)'
              }
            })}
          />
          {errors.panNumber && <p className="text-xs font-semibold text-red-500 mt-1">{errors.panNumber.message}</p>}
        </div>
      </div>

      <hr className="border-stone-200 my-6" />

      <h4 className="text-sm font-bold text-stone-900 font-display uppercase tracking-wider">
        Facility Uploads & Photos
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploadField
          label="Hospital/Clinic Registration Certificate *"
          value={watch('regCert')}
          onChange={(val) => setValue('regCert', val, { shouldValidate: true })}
          error={errors.regCert}
          isAdminOnly={true}
        />

        <FileUploadField
          label="Hospital/Clinic Entrance/Front Photo *"
          value={watch('hospitalPhoto')}
          onChange={(val) => setValue('hospitalPhoto', val, { shouldValidate: true })}
          error={errors.hospitalPhoto}
          isAdminOnly={false}
          helperText="Front view photo showing branding/board (JPEG/PNG)"
        />
      </div>
    </div>
  );
}
