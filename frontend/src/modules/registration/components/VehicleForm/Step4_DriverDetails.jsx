import React from 'react';
import FileUploadField from '../shared/FileUploadField';

export default function Step4_DriverDetails({ register, errors, watch, setValue }) {
  const driverPhoto = watch('driverPhoto');
  const driverDlDoc = watch('driverDlDoc');

  return (
    <div className="space-y-6">
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-6">
        <p className="text-xs text-stone-600 font-semibold">
          💡 You selected that the owner is not the driver. Please fill out the driver details below. Driver photo and name will be shown publicly to customers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Driver Name */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Driver Full Name <span className="text-red-500">*</span> <span className="text-xs text-emerald-600">(Public)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Amit Sharma"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.driverName ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('driverName', { required: 'Driver name is required' })}
          />
          {errors.driverName && <p className="text-xs font-semibold text-red-500 mt-1">{errors.driverName.message}</p>}
        </div>

        {/* Driver Address */}
        <div>
          <label className="flex justify-between items-center text-sm font-semibold text-stone-800 mb-1">
            <span>Driver Full Address <span className="text-red-500">*</span></span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-500">Admin Only</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Village Rampur, Near Main Temple, Delhi"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.driverAddress ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('driverAddress', { required: 'Driver address is required' })}
          />
          {errors.driverAddress && <p className="text-xs font-semibold text-red-500 mt-1">{errors.driverAddress.message}</p>}
        </div>

        {/* Driver Mobile */}
        <div>
          <label className="flex justify-between items-center text-sm font-semibold text-stone-800 mb-1">
            <span>Driver Mobile Number <span className="text-red-500">*</span></span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-accent border border-accent/25">Virtual Masked</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. 9876543210"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.driverMobile ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('driverMobile', { 
              required: 'Driver mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
          />
          {errors.driverMobile && <p className="text-xs font-semibold text-red-500 mt-1">{errors.driverMobile.message}</p>}
        </div>

        {/* Driver WhatsApp */}
        <div>
          <label className="flex justify-between items-center text-sm font-semibold text-stone-800 mb-1">
            <span>Driver WhatsApp Number <span className="text-red-500">*</span></span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-500">Admin Only</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. 9876543210"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.driverWhatsapp ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('driverWhatsapp', { 
              required: 'Driver WhatsApp number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
          />
          {errors.driverWhatsapp && <p className="text-xs font-semibold text-red-500 mt-1">{errors.driverWhatsapp.message}</p>}
        </div>
      </div>

      <hr className="border-stone-200 my-6" />

      {/* Driver DL & Photos */}
      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-6">
        <h4 className="text-sm font-bold text-stone-900 font-display uppercase tracking-wider">
          Driver Driving Licence (DL)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              DL Number *
            </label>
            <input
              type="text"
              placeholder="e.g. DL-142011000000"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.driverDlNumber ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('driverDlNumber', { required: 'Driver DL number is required' })}
            />
            {errors.driverDlNumber && <p className="text-xs font-semibold text-red-500 mt-1">{errors.driverDlNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              DL Issue Date *
            </label>
            <input
              type="date"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.driverDlIssueDate ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('driverDlIssueDate', { required: 'DL issue date is required' })}
            />
            {errors.driverDlIssueDate && <p className="text-xs font-semibold text-red-500 mt-1">{errors.driverDlIssueDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              DL Validity Up To *
            </label>
            <input
              type="date"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.driverDlValidityDate ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('driverDlValidityDate', { required: 'DL validity date is required' })}
            />
            {errors.driverDlValidityDate && <p className="text-xs font-semibold text-red-500 mt-1">{errors.driverDlValidityDate.message}</p>}
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              DL Issuing Authority *
            </label>
            <input
              type="text"
              placeholder="e.g. RTO Delhi"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border ${errors.driverDlAuthority ? 'border-red-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
              {...register('driverDlAuthority', { required: 'DL issuing authority is required' })}
            />
            {errors.driverDlAuthority && <p className="text-xs font-semibold text-red-500 mt-1">{errors.driverDlAuthority.message}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FileUploadField
          label="Driver's Passport Photo *"
          value={driverPhoto}
          onChange={(val) => setValue('driverPhoto', val, { shouldValidate: true })}
          error={errors.driverPhoto}
          isAdminOnly={false}
          helperText="Passport photo of driver. Shown publicly to customers. (JPEG/PNG)"
        />

        <FileUploadField
          label="Driver's DL Copy *"
          value={driverDlDoc}
          onChange={(val) => setValue('driverDlDoc', val, { shouldValidate: true })}
          error={errors.driverDlDoc}
          isAdminOnly={true}
          helperText="Upload Driving License (PDF/JPEG)"
        />
      </div>
    </div>
  );
}
