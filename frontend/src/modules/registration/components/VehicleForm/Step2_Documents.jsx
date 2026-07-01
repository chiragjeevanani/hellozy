import React from 'react';
import FileUploadField from '../shared/FileUploadField';

export default function Step2_Documents({ register, errors, watch, setValue, type }) {
  const vehicleCategory = watch('vehicleCategory') || type || 'four-wheeler';
  const isERickshaw = vehicleCategory === 'e-rickshaw' || vehicleCategory === 'three-wheeler';
  const isBus = vehicleCategory === 'bus';
  const fuelType = watch('fuelType');
  const vehicleType = watch('vehicleType');
  const isElectric = fuelType === 'electric' || vehicleType === 'electric-bike' || isERickshaw;

  // Watch file fields
  const aadharDoc = watch('aadharDoc');
  const rcDoc = watch('rcDoc');
  const insuranceDoc = watch('insuranceDoc');
  const dlDoc = watch('dlDoc');
  const pucDoc = watch('pucDoc');
  const agreementDoc = watch('agreementDoc');
  const tcDoc = watch('tcDoc');
  const bankDoc = watch('bankDoc');
  const addressPhoto = watch('addressPhoto');
  const hasGst = watch('hasGst');

  return (
    <div className="space-y-8 text-left">
      {/* File Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FileUploadField
          label="Aadhar Card (Front + Back in 1 File) *"
          value={aadharDoc}
          onChange={(val) => setValue('aadharDoc', val, { shouldValidate: true })}
          error={errors.aadharDoc}
          isAdminOnly={true}
        />

        <FileUploadField
          label="RC (Registration Certificate) *"
          value={rcDoc}
          onChange={(val) => setValue('rcDoc', val, { shouldValidate: true })}
          error={errors.rcDoc}
          isAdminOnly={true}
        />

        <FileUploadField
          label="Insurance Paper *"
          value={insuranceDoc}
          onChange={(val) => setValue('insuranceDoc', val, { shouldValidate: true })}
          error={errors.insuranceDoc}
          isAdminOnly={true}
        />

        <FileUploadField
          label="Owner's Driving Licence (DL) Document *"
          value={dlDoc}
          onChange={(val) => setValue('dlDoc', val, { shouldValidate: true })}
          error={errors.dlDoc}
          isAdminOnly={true}
        />

        {/* PUC - Hide for Electric Vehicles and Buses */}
        {!isElectric && !isBus && (
          <FileUploadField
            label="PUC Certificate *"
            value={pucDoc}
            onChange={(val) => setValue('pucDoc', val, { shouldValidate: true })}
            error={errors.pucDoc}
            isAdminOnly={true}
          />
        )}

        <FileUploadField
          label="Agreement Document *"
          value={agreementDoc}
          onChange={(val) => setValue('agreementDoc', val, { shouldValidate: true })}
          error={errors.agreementDoc}
          isAdminOnly={true}
        />

        <FileUploadField
          label="Signed Terms & Conditions Document *"
          value={tcDoc}
          onChange={(val) => setValue('tcDoc', val, { shouldValidate: true })}
          error={errors.tcDoc}
          isAdminOnly={true}
        />

        <FileUploadField
          label="Bank Account Proof (Passbook/Cancelled Cheque) *"
          value={bankDoc}
          onChange={(val) => setValue('bankDoc', val, { shouldValidate: true })}
          error={errors.bankDoc}
          isAdminOnly={true}
        />

        <FileUploadField
          label="Residence or Office Address Photo *"
          value={addressPhoto}
          onChange={(val) => setValue('addressPhoto', val, { shouldValidate: true })}
          error={errors.addressPhoto}
          isAdminOnly={true}
        />
      </div>

      <hr className="border-stone-250/60 my-6" />

      {/* Structured inputs for DL & Bank */}
      <div className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200/80 space-y-6">
        <h4 className="text-sm font-bold text-stone-900 font-display uppercase tracking-wider">
          Driving Licence (DL) Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-850">
              DL Number *
            </label>
            <input
              type="text"
              placeholder="e.g. DL-142010000000"
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
                errors.dlNumber ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
              }`}
              {...register('dlNumber', { required: 'DL number is required' })}
            />
            {errors.dlNumber && <p className="text-xs font-bold text-red-500">{errors.dlNumber.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-850">
              DL Issue Date *
            </label>
            <input
              type="date"
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
                errors.dlIssueDate ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
              }`}
              {...register('dlIssueDate', { required: 'DL issue date is required' })}
            />
            {errors.dlIssueDate && <p className="text-xs font-bold text-red-500">{errors.dlIssueDate.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-850">
              DL Validity Up To *
            </label>
            <input
              type="date"
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
                errors.dlValidityDate ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
              }`}
              {...register('dlValidityDate', { required: 'DL validity date is required' })}
            />
            {errors.dlValidityDate && <p className="text-xs font-bold text-red-500">{errors.dlValidityDate.message}</p>}
          </div>

          <div className="md:col-span-3 space-y-2">
            <label className="block text-sm font-bold text-stone-850">
              DL Issuing Authority *
            </label>
            <input
              type="text"
              placeholder="e.g. RTO Delhi, Janakpuri"
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
                errors.dlAuthority ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
              }`}
              {...register('dlAuthority', { required: 'DL issuing authority is required' })}
            />
            {errors.dlAuthority && <p className="text-xs font-bold text-red-500">{errors.dlAuthority.message}</p>}
          </div>
        </div>
      </div>

      <div className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200/80 space-y-6">
        <h4 className="text-sm font-bold text-stone-900 font-display uppercase tracking-wider">
          Financial & UPI Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-stone-850">
              UPI ID
            </label>
            <input
              type="text"
              placeholder="e.g. owner@upi"
              className="w-full px-4 py-3 bg-white rounded-xl border-2 border-stone-200 hover:border-stone-300 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent"
              {...register('upiId')}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-stone-850">
              Do you have GSTIN registration?
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setValue('hasGst', 'yes', { shouldValidate: true })}
                className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                  hasGst === 'yes'
                    ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setValue('hasGst', 'no', { shouldValidate: true })}
                className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                  hasGst === 'no'
                    ? 'border-accent bg-accent/5 text-accent ring-4 ring-accent/10'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                No
              </button>
            </div>
            <input type="hidden" {...register('hasGst')} />
          </div>

          {hasGst === 'yes' && (
            <div className="md:col-span-2 space-y-2 animate-fadeIn">
              <label className="block text-sm font-bold text-stone-850">
                GSTIN Number *
              </label>
              <input
                type="text"
                placeholder="e.g. 07AAAAA1111A1Z1"
                className={`w-full px-4 py-3 bg-white rounded-xl border-2 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent ${
                  errors.gstNumber ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'
                }`}
                {...register('gstNumber', { required: hasGst === 'yes' ? 'GSTIN is required' : false })}
              />
              {errors.gstNumber && <p className="text-xs font-bold text-red-500">{errors.gstNumber.message}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
