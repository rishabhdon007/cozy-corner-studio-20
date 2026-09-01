"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, AlertTriangle, CheckCircle2, Image as ImageIcon } from "lucide-react";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export const ImageField = ({
  label,
  value,
  onChange,
  placeholder = "e.g. /uploads/image.png or /company/photo.jpg",
  className = "",
}: ImageFieldProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);

  // Clear local blob URL when value changes or is cleared
  useEffect(() => {
    setLocalBlobUrl(null);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setImageError(false);

    // 1MB validation check (1MB = 1048576 bytes)
    const MAX_SIZE_BYTES = 1 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setError(`Image size (${sizeMB} MB) exceeds 1MB limit. Please upload an image smaller than 1MB.`);
      e.target.value = "";
      return;
    }

    // Instant local blob URL preview
    const blobUrl = URL.createObjectURL(file);
    setLocalBlobUrl(blobUrl);

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.url) {
        onChange(json.url);
        setError(null);
        setImageError(false);
      } else {
        setError(json.error || "Failed to upload image.");
      }
    } catch (err: any) {
      setError("Network failure during image upload.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const activeImageSrc = localBlobUrl || value;

  const uploadId = `file-upload-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <div className={`space-y-2.5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all hover:border-gray-300 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5 text-blue-600" />
          {label}
        </Label>
        <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
          Max: 1 MB
        </span>
      </div>

      <div className="flex items-start gap-4">
        {/* Preview Thumbnail Box */}
        <div className="relative group h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner">
          {activeImageSrc && !imageError ? (
            <img
              src={activeImageSrc}
              alt={label}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-2 text-center text-gray-400">
              <ImageIcon className="h-6 w-6 stroke-[1.5]" />
              <span className="text-[9px] font-medium mt-1 leading-tight">No Preview</span>
            </div>
          )}
          {activeImageSrc && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[9px] font-bold text-white uppercase tracking-wider">Preview</span>
            </div>
          )}
        </div>

        {/* Inputs & Controls */}
        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <Input
              value={value}
              onChange={(e) => {
                setImageError(false);
                setError(null);
                setLocalBlobUrl(null);
                onChange(e.target.value);
              }}
              placeholder={placeholder}
              className="h-9 text-xs border-gray-200 font-mono focus:border-blue-500 bg-gray-50/50"
            />
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setImageError(false);
                  setError(null);
                  setLocalBlobUrl(null);
                }}
                className="h-9 px-2.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold flex items-center gap-1 transition-all shrink-0"
                title="Clear image URL"
              >
                <X className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 pt-0.5">
            <input
              type="file"
              accept="image/*"
              id={uploadId}
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <label
              htmlFor={uploadId}
              className={`h-8 px-3.5 rounded-lg border text-xs font-bold cursor-pointer transition-all inline-flex items-center gap-1.5 select-none ${
                uploading
                  ? "bg-gray-100 text-gray-400 border-gray-200"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 active:scale-95"
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              {uploading ? "Uploading..." : "Upload New Image"}
            </label>

            {value && !error && (
              <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 truncate">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                Image Set
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Warning / Error Notice */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
          <div className="font-semibold leading-tight">{error}</div>
        </div>
      )}
    </div>
  );
};
