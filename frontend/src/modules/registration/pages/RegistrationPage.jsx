import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

import RegistrationTypeSelector from '../components/RegistrationTypeSelector';
import VehicleCategorySelector from '../components/VehicleCategorySelector';
import ProgressBar from '../components/shared/ProgressBar';

// Vehicle Forms Steps
import Step1_VehicleDetails from '../components/VehicleForm/Step1_VehicleDetails';
import Step2_Documents from '../components/VehicleForm/Step2_Documents';
import Step3_OwnerDetails from '../components/VehicleForm/Step3_OwnerDetails';
import Step4_DriverDetails from '../components/VehicleForm/Step4_DriverDetails';
import Step5_Review from '../components/VehicleForm/Step5_Review';

// Hospital Forms Steps
import Step1_HospitalDetails from '../components/HospitalForm/Step1_HospitalDetails';
import Step2_OfficerDetails from '../components/HospitalForm/Step2_OfficerDetails';
import Step3_HospitalReview from '../components/HospitalForm/Step3_Review';

// Influencer Forms Steps
import Step1_PersonalDetails from '../components/InfluencerForm/Step1_PersonalDetails';
import Step2_InfluencerReview from '../components/InfluencerForm/Step2_Review';

import { saveRegistration, isPaymentEnabled } from '../utils/registrationStore';

export default function RegistrationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type');
  const [step, setStep] = useState(0);
  const [paymentActive, setPaymentActive] = useState(false);

  const initialType = searchParams.get('type') || 'four-wheeler';
  const defaultCategory = ['four-wheeler', 'pickup', 'bus', 'three-wheeler', 'e-rickshaw', 'bike'].includes(initialType)
    ? (initialType === 'e-rickshaw' ? 'three-wheeler' : initialType)
    : 'four-wheeler';

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm({
    defaultValues: {
      isOwnerDriver: 'yes',
      financed: 'no',
      commercialPermit: 'no',
      hasGst: 'no',
      vehicleCategory: defaultCategory,
    }
  });

  const isOwnerDriver = watch('isOwnerDriver') === 'yes';
  const isVehicleFlow = type === 'vehicle' || ['four-wheeler', 'pickup', 'bus', 'three-wheeler', 'e-rickshaw', 'bike'].includes(type);
  const vehicleCategory = watch('vehicleCategory') || 'four-wheeler';

  useEffect(() => {
    // Reset step when registration type changes
    setStep(0);
    setPaymentActive(isPaymentEnabled());

    if (['four-wheeler', 'pickup', 'bus', 'three-wheeler', 'e-rickshaw', 'bike'].includes(type)) {
      setValue('vehicleCategory', type === 'e-rickshaw' ? 'three-wheeler' : type);
    }
  }, [type, setValue]);

  const handleSelectType = (selectedType) => {
    if (selectedType === 'event-registration') {
      navigate('/event-registration');
    } else {
      setSearchParams({ type: selectedType });
    }
  };

  // Steps Lists per flow
  const vehicleSteps = [
    'Vehicle Info',
    'Verification Docs',
    'Owner Profile',
    ...(!isOwnerDriver ? ['Driver Profile'] : []),
    'Summary Review'
  ];

  const hospitalSteps = [
    'Hospital Profile',
    'Owner & Officers',
    'Summary Review'
  ];

  const influencerSteps = [
    'Profile Details',
    'Summary Review'
  ];

  const getSteps = () => {
    if (isVehicleFlow) return vehicleSteps;
    if (type === 'hospital') return hospitalSteps;
    if (type === 'influencer') return influencerSteps;
    return [];
  };

  const steps = getSteps();

  const handleNext = async () => {
    // Determine which fields are in current step and trigger validation
    let fieldsToValidate = [];
    
    if (isVehicleFlow) {
      if (step === 0) {
        fieldsToValidate = ['vehicleCategory', 'vehicleType', 'customVehicleType', 'vehicleNumber', 'makeName', 'modelNumber', 'vehicleColor', 'engineNumber', 'chassisNumber', 'hsrp', 'financed', 'isOwnerDriver'];
        if (vehicleCategory !== 'e-rickshaw' && vehicleCategory !== 'three-wheeler') fieldsToValidate.push('fuelType', 'commercialPermit');
        if (vehicleCategory !== 'pickup') fieldsToValidate.push('seatingCapacity', 'carrier');
        if (vehicleCategory === 'pickup') fieldsToValidate.push('loadCapacity', 'dimensions');
        if (watch('financed') === 'yes') fieldsToValidate.push('financierName', 'financeDate');
        if (watch('commercialPermit') === 'yes') fieldsToValidate.push('permitDoc');
      } else if (step === 1) {
        fieldsToValidate = ['aadharDoc', 'rcDoc', 'insuranceDoc', 'dlDoc', 'agreementDoc', 'tcDoc', 'bankDoc', 'addressPhoto', 'dlNumber', 'dlIssueDate', 'dlValidityDate', 'dlAuthority'];
        const isElectric = watch('fuelType') === 'electric' || watch('vehicleType') === 'electric-bike' || vehicleCategory === 'three-wheeler' || vehicleCategory === 'e-rickshaw';
        if (vehicleCategory !== 'e-rickshaw' && vehicleCategory !== 'three-wheeler' && vehicleCategory !== 'bus' && !isElectric) fieldsToValidate.push('pucDoc');
        if (watch('hasGst') === 'yes') fieldsToValidate.push('gstNumber');
      } else if (step === 2) {
        fieldsToValidate = ['ownerName', 'ownerAddress', 'ownerMobile', 'ownerWhatsapp', 'ownerEmail', 'ownerPhoto', 'vehiclePhoto', 'isOwnerDriver'];
      } else if (step === 3 && !isOwnerDriver) {
        fieldsToValidate = ['driverName', 'driverAddress', 'driverMobile', 'driverWhatsapp', 'driverDlNumber', 'driverDlIssueDate', 'driverDlValidityDate', 'driverDlAuthority', 'driverPhoto', 'driverDlDoc'];
      }
    } else if (type === 'hospital') {
      if (step === 0) {
        fieldsToValidate = ['hospitalName', 'hospitalAddress', 'gstNumber', 'panNumber', 'regCert', 'hospitalPhoto'];
      } else if (step === 1) {
        fieldsToValidate = ['ownerName', 'ownerMobile', 'ownerEmail', 'ownerAddress', 'ownerAadhar', 'ownerPhoto', 'officerName', 'officerMobile', 'officerEmail', 'officerAddress', 'officerAadhar', 'officerPhoto'];
      }
    } else if (type === 'influencer') {
      if (step === 0) {
        fieldsToValidate = ['name', 'address', 'mobile', 'email', 'aadharDoc', 'passportPhoto', 'fullPhoto'];
      }
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(0, prev - 1));
    window.scrollTo(0, 0);
  };

  const onSubmit = (data) => {
    // Map uploaded file names for simple representation since we cannot save file buffers directly in localStorage
    const cleanData = { ...data };
    
    // File uploads mapping helper
    const docFields = [
      'permitDoc', 'aadharDoc', 'rcDoc', 'insuranceDoc', 'dlDoc', 'pucDoc', 'agreementDoc', 'tcDoc', 'bankDoc', 'addressPhoto', 
      'ownerPhoto', 'vehiclePhoto', 'driverPhoto', 'driverDlDoc', 'regCert', 'hospitalPhoto', 'ownerAadhar', 'officerAadhar', 'officerPhoto', 'passportPhoto', 'fullPhoto'
    ];

    docFields.forEach(field => {
      if (cleanData[field] && typeof cleanData[field] === 'object') {
        cleanData[field] = {
          name: cleanData[field].name,
          size: cleanData[field].size,
          type: cleanData[field].type,
          url: cleanData[field].url // Will load locally in current tab context
        };
      }
    });

    const finalType = isVehicleFlow ? vehicleCategory : type;
    const saved = saveRegistration({
      type: finalType,
      ...cleanData
    });

    if (saved) {
      navigate('/register/success', { state: { registrationId: saved.id, type: finalType } });
    }
  };

  // Render Step Body
  const renderStepContent = () => {
    if (isVehicleFlow) {
      switch (step) {
        case 0:
          return <Step1_VehicleDetails register={register} errors={errors} type={type} watch={watch} setValue={setValue} />;
        case 1:
          return <Step2_Documents register={register} errors={errors} watch={watch} setValue={setValue} type={type} />;
        case 2:
          return <Step3_OwnerDetails register={register} errors={errors} watch={watch} setValue={setValue} />;
        case 3:
          if (!isOwnerDriver) {
            return <Step4_DriverDetails register={register} errors={errors} watch={watch} setValue={setValue} />;
          }
          return <Step5_Review watch={watch} onEditStep={setStep} type={type} paymentEnabled={paymentActive} />;
        case 4:
          return <Step5_Review watch={watch} onEditStep={setStep} type={type} paymentEnabled={paymentActive} />;
        default:
          return null;
      }
    }

    if (type === 'hospital') {
      switch (step) {
        case 0:
          return <Step1_HospitalDetails register={register} errors={errors} watch={watch} setValue={setValue} />;
        case 1:
          return <Step2_OfficerDetails register={register} errors={errors} watch={watch} setValue={setValue} />;
        case 2:
          return <Step3_HospitalReview watch={watch} onEditStep={setStep} paymentEnabled={paymentActive} />;
        default:
          return null;
      }
    }

    if (type === 'influencer') {
      switch (step) {
        case 0:
          return <Step1_PersonalDetails register={register} errors={errors} watch={watch} setValue={setValue} />;
        case 1:
          return <Step2_InfluencerReview watch={watch} onEditStep={setStep} paymentEnabled={paymentActive} />;
        default:
          return null;
      }
    }

    return null;
  };

  if (!type) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
        <RegistrationTypeSelector onSelect={handleSelectType} />
      </div>
    );
  }

  if (type === 'vehicle') {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
        <VehicleCategorySelector 
          onSelect={(category) => setSearchParams({ type: category })} 
          onBack={() => setSearchParams({})} 
        />
      </div>
    );
  }

  const isLastStep = step === steps.length - 1;

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setSearchParams({})}
            className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Change partner type
          </button>
          
          <div className="flex items-center space-x-1.5 text-xs text-stone-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secured 256-bit Connection</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 md:p-10 shadow-xs">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-2xl font-extrabold text-primary font-display capitalize">
              {isVehicleFlow ? 'Vehicle Partner' : type.replace('-', ' ')} Registration
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Please provide valid certificates. All submissions are cross-referenced manually.
            </p>
          </div>

          <ProgressBar steps={steps} currentStep={step} />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <motion.div 
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="min-h-[300px]"
            >
              {renderStepContent()}
            </motion.div>

            {/* Bottom Actions */}
            <div className="mt-12 pt-6 border-t border-stone-150 flex justify-between items-center">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-stone-200 text-sm font-semibold rounded-xl text-stone-700 hover:bg-stone-50 transition-all duration-200 inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
              ) : (
                <div />
              )}

              {isLastStep ? (
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  Submit Application <ShieldCheck className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-primary hover:bg-primary-light text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
