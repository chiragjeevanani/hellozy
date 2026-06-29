import React from 'react';
import FileUploadField from '../shared/FileUploadField';

export default function Step1_PersonalDetails({ register, errors, watch, setValue }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Rahul Verma"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50/10' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-xs font-semibold text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Residential Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. H.No 45, Sector 9, Rohini, Delhi"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.address ? 'border-red-500 bg-red-50/10' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <p className="text-xs font-semibold text-red-500 mt-1">{errors.address.message}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. 9876543210"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.mobile ? 'border-red-500 bg-red-50/10' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('mobile', { 
              required: 'Mobile is required',
              pattern: { value: /^[0-9]{10}$/, message: 'Must be a 10-digit number' }
            })}
          />
          {errors.mobile && <p className="text-xs font-semibold text-red-500 mt-1">{errors.mobile.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Email ID <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="e.g. rahul@example.com"
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50/10' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold`}
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email ID' }
            })}
          />
          {errors.email && <p className="text-xs font-semibold text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <hr className="border-stone-200 my-6" />

      {/* Social Media Links */}
      <h4 className="text-sm font-bold text-stone-900 font-display uppercase tracking-wider">
        Social Media Channels
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Instagram Handle/Link
          </label>
          <input
            type="text"
            placeholder="e.g. instagram.com/username"
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold"
            {...register('instagram')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Facebook Profile/Page
          </label>
          <input
            type="text"
            placeholder="e.g. facebook.com/username"
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold"
            {...register('facebook')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            YouTube Channel Link
          </label>
          <input
            type="text"
            placeholder="e.g. youtube.com/c/channel"
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold"
            {...register('youtube')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Additional Platform Link 1
          </label>
          <input
            type="text"
            placeholder="e.g. twitter.com/username"
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold"
            {...register('extraLink1')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Additional Platform Link 2
          </label>
          <input
            type="text"
            placeholder="e.g. linkedin.com/in/username"
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold"
            {...register('extraLink2')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1">
            Additional Platform Link 3
          </label>
          <input
            type="text"
            placeholder="e.g. threads.net/@username"
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-stone-800 font-semibold"
            {...register('extraLink3')}
          />
        </div>
      </div>

      <hr className="border-stone-200 my-6" />

      {/* Upload Docs */}
      <h4 className="text-sm font-bold text-stone-900 font-display uppercase tracking-wider">
        Verification Verification Documents
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FileUploadField
          label="Aadhar Card (Front + Back) *"
          value={watch('aadharDoc')}
          onChange={(val) => setValue('aadharDoc', val, { shouldValidate: true })}
          error={errors.aadharDoc}
          isAdminOnly={true}
        />

        <FileUploadField
          label="Passport Size Photo *"
          value={watch('passportPhoto')}
          onChange={(val) => setValue('passportPhoto', val, { shouldValidate: true })}
          error={errors.passportPhoto}
          isAdminOnly={false}
          helperText="Front headshot (JPEG/PNG)"
        />

        <FileUploadField
          label="Full Length Portfolio Photo *"
          value={watch('fullPhoto')}
          onChange={(val) => setValue('fullPhoto', val, { shouldValidate: true })}
          error={errors.fullPhoto}
          isAdminOnly={false}
          helperText="Creative vertical photo (JPEG/PNG)"
        />
      </div>
    </div>
  );
}
