import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';

export default function FileUploadField({ 
  label, 
  value, 
  onChange, 
  error, 
  accept = "image/*,application/pdf", 
  isAdminOnly = false,
  helperText = "" 
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    
    // Create a local preview URI
    const previewUrl = URL.createObjectURL(file);
    onChange({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      type: file.type,
      url: previewUrl,
      rawFile: file // Keep reference to actual file for uploads later
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-semibold text-stone-800">
          {label}
        </label>
        {isAdminOnly && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-500 border border-stone-200">
            Admin Only
          </span>
        )}
      </div>

      {!value ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            dragActive 
              ? 'border-accent bg-accent/5 scale-[0.99]' 
              : error 
                ? 'border-red-300 hover:border-red-400 bg-red-50/10' 
                : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          <Upload className={`h-8 w-8 mb-3 ${error ? 'text-red-400' : 'text-stone-400 group-hover:text-stone-500'}`} />
          <p className="text-sm font-medium text-stone-700">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-stone-500 mt-1">
            {helperText || "PDF, PNG, JPG, or JPEG up to 10MB"}
          </p>
        </div>
      ) : (
        <div className="border border-stone-200 rounded-xl p-4 bg-stone-50 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3 overflow-hidden">
            {value.type?.startsWith('image/') ? (
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-200 shrink-0 bg-white">
                <img src={value.url} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 text-stone-400">
                <FileText className="h-6 w-6" />
              </div>
            )}
            <div className="text-left overflow-hidden">
              <p className="text-sm font-semibold text-stone-800 truncate max-w-[200px] sm:max-w-xs">
                {value.name}
              </p>
              <p className="text-xs text-stone-500">
                {value.size}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs font-semibold text-red-500 mt-1">
          {error.message || error}
        </p>
      )}
    </div>
  );
}
