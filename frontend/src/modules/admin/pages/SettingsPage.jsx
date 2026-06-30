import React, { useState, useEffect } from 'react';
import { 
  isPaymentEnabled, 
  setPaymentEnabled, 
  getBanners, 
  saveBanner, 
  deleteBanner, 
  toggleBannerActive,
  getCommissionConfig,
  setCommissionConfig
} from '../../registration/utils/registrationStore';
import { changeAdminCredentials } from '../utils/adminAuth';
import { CreditCard, KeyRound, CheckCircle2, AlertCircle, Image, Plus, Trash2, Globe, Percent, IndianRupee, Upload } from 'lucide-react';

export default function SettingsPage() {
  const [paymentConfig, setPaymentConfig] = useState(false);
  
  // Credentials state
  const [currentPassword, setCurrentPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('admin@hellozy.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdStatus, setPwdStatus] = useState({ type: '', message: '' });

  // Commission state
  const [commissionType, setCommissionType] = useState('percentage');
  const [commissionValue, setCommissionValue] = useState('10');
  const [commissionStatus, setCommissionStatus] = useState({ type: '', message: '' });

  // Banner State
  const [banners, setBanners] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [bannerStatus, setBannerStatus] = useState({ type: '', message: '' });
  const [imageSourceType, setImageSourceType] = useState('url'); // 'url' | 'file'
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setBannerStatus({ type: 'error', message: 'Image size must be less than 5MB.' });
      return;
    }

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewImageUrl(event.target.result);
    };
    reader.onerror = () => {
      setBannerStatus({ type: 'error', message: 'Failed to read file.' });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setPaymentConfig(isPaymentEnabled());
    const storedEmail = localStorage.getItem('hellozy_admin_email');
    if (storedEmail) {
      setAdminEmail(storedEmail);
    }
    const cfg = getCommissionConfig();
    setCommissionType(cfg.type);
    setCommissionValue(String(cfg.value));
    loadBanners();
  }, []);

  const loadBanners = () => {
    setBanners(getBanners());
  };

  const handleTogglePayment = () => {
    const newVal = !paymentConfig;
    setPaymentConfig(newVal);
    setPaymentEnabled(newVal);
  };

  const handleSaveCommission = (e) => {
    e.preventDefault();
    const val = Number(commissionValue);
    if (isNaN(val) || val < 0) {
      setCommissionStatus({ type: 'error', message: 'Please enter a valid commission value.' });
      return;
    }
    if (commissionType === 'percentage' && val > 100) {
      setCommissionStatus({ type: 'error', message: 'Percentage cannot exceed 100%.' });
      return;
    }
    setCommissionConfig(commissionType, val);
    setCommissionStatus({ type: 'success', message: 'Commission rate saved successfully!' });
    setTimeout(() => setCommissionStatus({ type: '', message: '' }), 3000);
  };

  // Live commission preview (on ₹1000 example)
  const previewAmount = 1000;
  const previewCommission = commissionType === 'percentage'
    ? Math.round((previewAmount * Number(commissionValue || 0)) / 100)
    : Number(commissionValue || 0);

  const handleCredentialsChange = (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setPwdStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    
    const success = changeAdminCredentials(currentPassword, adminEmail, newPassword);
    if (success) {
      setPwdStatus({ type: 'success', message: 'Credentials updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPwdStatus({ type: 'error', message: 'Incorrect current password.' });
    }
  };

  const handleAddBanner = (e) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) {
      setBannerStatus({ type: 'error', message: 'Title and Image URL are required.' });
      return;
    }
    const saved = saveBanner({
      title: newTitle,
      imageUrl: newImageUrl,
      linkUrl: newLinkUrl || '#'
    });

    if (saved) {
      setBannerStatus({ type: 'success', message: 'Banner added successfully!' });
      setNewTitle('');
      setNewImageUrl('');
      setNewLinkUrl('');
      setUploadedFileName('');
      loadBanners();
      // Auto-clear success message
      setTimeout(() => setBannerStatus({ type: '', message: '' }), 4000);
    } else {
      setBannerStatus({ type: 'error', message: 'Failed to add banner.' });
    }
  };

  const handleDeleteBanner = (id) => {
    if (confirm('Are you sure you want to delete this advertisement banner?')) {
      deleteBanner(id);
      loadBanners();
    }
  };

  const handleToggleActive = (id) => {
    toggleBannerActive(id);
    loadBanners();
  };

  return (
    <div className="max-w-3xl space-y-8 text-left">

      {/* Commission Configuration Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 font-display mb-2">
          Commission Configuration
        </h3>
        <p className="text-xs text-stone-500 font-semibold mb-6">
          Set the platform commission deducted from each event booking made by users.
        </p>

        <form onSubmit={handleSaveCommission} className="space-y-5">
          {/* Type Toggle */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCommissionType('percentage')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                commissionType === 'percentage'
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Percent size={14} /> Percentage (%)
            </button>
            <button
              type="button"
              onClick={() => setCommissionType('flat')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                commissionType === 'flat'
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <IndianRupee size={14} /> Flat Amount (₹)
            </button>
          </div>

          {/* Value Input */}
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                {commissionType === 'percentage' ? 'Commission Percentage (%)' : 'Flat Commission Amount (₹)'}
              </label>
              <input
                type="number"
                min="0"
                max={commissionType === 'percentage' ? 100 : undefined}
                step="0.5"
                value={commissionValue}
                onChange={(e) => setCommissionValue(e.target.value)}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                placeholder={commissionType === 'percentage' ? 'e.g. 10' : 'e.g. 50'}
                required
              />
            </div>
            {/* Live Preview */}
            <div className="px-4 py-2.5 bg-accent/8 border border-accent/20 rounded-xl text-xs shrink-0">
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mb-0.5">Preview on ₹1,000 booking</p>
              <p className="font-extrabold text-accent">Commission = ₹{previewCommission}</p>
            </div>
          </div>

          {commissionStatus.message && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              commissionStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-250' : 'bg-red-50 text-red-700 border border-red-250'
            }`}>
              {commissionStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{commissionStatus.message}</span>
            </div>
          )}

          <div className="pt-2 border-t border-stone-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm cursor-pointer inline-flex items-center gap-1.5"
            >
              <IndianRupee className="w-3.5 h-3.5" /> Save Commission Rate
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 font-display mb-2">
          Onboarding Configurations
        </h3>
        <p className="text-xs text-stone-500 font-semibold mb-6">
          Toggle launch payment requirements for new drivers, partners, and hospitals.
        </p>

        <div className="flex items-center justify-between p-4 border border-stone-150 rounded-2xl bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-accent">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Collect Registration Fee
              </h4>
              <p className="text-[10px] text-stone-500 font-semibold mt-0.5">
                Enable payment screens at the final onboarding checkout step.
              </p>
            </div>
          </div>

          <button
            onClick={handleTogglePayment}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              paymentConfig ? 'bg-accent' : 'bg-stone-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                paymentConfig ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Banner Management Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 font-display mb-2">
          Promotional Carousel Banners
        </h3>
        <p className="text-xs text-stone-500 font-semibold mb-6">
          Manage advertising slides on the public landing page to promote brands or services.
        </p>

        {/* Existing Banners list */}
        <div className="space-y-3 mb-8">
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
            Active Advertisements ({banners.length})
          </label>
          
          {banners.length > 0 ? (
            <div className="grid gap-3">
              {banners.map((banner) => (
                <div key={banner.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 border border-stone-150 rounded-2xl bg-stone-50/50 gap-3">
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={banner.imageUrl} 
                      alt={banner.title} 
                      className="w-14 h-10 rounded-lg object-cover bg-stone-200 shrink-0 border border-stone-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 leading-tight">{banner.title}</h4>
                      <p className="text-[9px] text-stone-500 font-mono mt-0.5 truncate max-w-[200px] sm:max-w-xs">{banner.linkUrl}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between border-t sm:border-none pt-2 sm:pt-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-stone-500">Active</span>
                      <button
                        onClick={() => handleToggleActive(banner.id)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          banner.isActive ? 'bg-emerald-600' : 'bg-stone-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            banner.isActive ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete banner"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 border border-dashed border-stone-250 rounded-2xl text-center text-stone-400 font-semibold text-xs bg-white">
              No promo banners set. Create one below!
            </div>
          )}
        </div>

        {/* Add Banner Form */}
        <form onSubmit={handleAddBanner} className="border-t border-stone-100 pt-6 space-y-4">
          <h4 className="text-xs font-bold text-stone-900 font-display">Add Advertisement Slide</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Ad Title / Slogan *
              </label>
              <input
                type="text"
                placeholder="e.g. Save 20% on your first premium vehicle booking!"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Banner Image *
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setImageSourceType('url');
                      setNewImageUrl('');
                      setUploadedFileName('');
                    }}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                      imageSourceType === 'url'
                        ? 'bg-accent/10 text-accent border border-accent/25'
                        : 'text-stone-400 hover:text-stone-600 border border-transparent'
                    }`}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageSourceType('file');
                      setNewImageUrl('');
                      setUploadedFileName('');
                    }}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                      imageSourceType === 'file'
                        ? 'bg-accent/10 text-accent border border-accent/25'
                        : 'text-stone-400 hover:text-stone-600 border border-transparent'
                    }`}
                  >
                    Upload File
                  </button>
                </div>
              </div>

              {imageSourceType === 'url' ? (
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or base64"
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  required={imageSourceType === 'url'}
                />
              ) : (
                <div className="space-y-2">
                  <div className="relative border border-dashed border-stone-300 hover:border-stone-400 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-stone-50/50 transition-colors duration-150 cursor-pointer min-h-[90px]">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      required={imageSourceType === 'file' && !newImageUrl}
                    />
                    <div className="text-center pointer-events-none">
                      <Upload className="w-5 h-5 text-stone-450 mx-auto mb-1.5" />
                      <span className="text-[11px] text-stone-650 font-bold block">
                        {uploadedFileName ? uploadedFileName : "Click to select an image"}
                      </span>
                      <span className="text-[9px] text-stone-400 block mt-0.5">
                        PNG, JPG, JPEG, WEBP or GIF (max 5MB)
                      </span>
                    </div>
                  </div>
                  {newImageUrl && (
                    <div className="flex items-center gap-2.5 px-3 py-2 bg-stone-50 rounded-xl border border-stone-150">
                      <img src={newImageUrl} alt="Preview" className="w-10 h-7 object-cover rounded border border-stone-200" />
                      <span className="text-[10px] text-stone-500 font-semibold truncate max-w-[180px]">Previewing selected image</span>
                      <button 
                        type="button"
                        onClick={() => { setNewImageUrl(''); setUploadedFileName(''); }}
                        className="text-[10px] text-red-500 hover:text-red-650 hover:underline font-bold ml-auto cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Redirect Destination Link
              </label>
              <input
                type="text"
                placeholder="e.g. /event-registration, #register"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
              />
            </div>
          </div>

          {bannerStatus.message && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              bannerStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-250' : 'bg-red-50 text-red-700 border border-red-250'
            }`}>
              {bannerStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{bannerStatus.message}</span>
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-stone-100">
            <button
              type="submit"
              className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus size={14} /> Add Slide
            </button>
          </div>
        </form>
      </div>

      {/* Admin Credentials Change Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 font-display mb-2">
          Update Authentication Credentials
        </h3>
        <p className="text-xs text-stone-500 font-semibold mb-6">
          Keep your management email and password secure.
        </p>

        <form onSubmit={handleCredentialsChange} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Admin Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                New Password (Optional)
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={newPassword}
                placeholder="Leave blank to keep current password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={confirmPassword}
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {pwdStatus.message && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              pwdStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-250' : 'bg-red-50 text-red-700 border border-red-250'
            }`}>
              {pwdStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{pwdStatus.message}</span>
            </div>
          )}

          <div className="pt-2 border-t border-stone-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm cursor-pointer inline-flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
