import React, { useRef } from 'react';
import { TreeMode, ShowState } from '../types';

interface UIOverlayProps {
  mode: TreeMode;
  onToggle: () => void;
  onPhotosUpload: (photos: string[]) => void;
  hasPhotos: boolean;
  showState: ShowState;
  onStartShow: () => void;
  onStopShow: () => void;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({ mode, onToggle, onPhotosUpload, hasPhotos, showState, onStartShow, onStopShow }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const readers: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const promise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });

      readers.push(promise);
    }

    Promise.all(readers).then((urls) => {
      onPhotosUpload(urls);
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">

      {/* Header */}
      <header className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5E6BF] to-[#D4AF37] font-serif drop-shadow-lg tracking-wider text-center">
          Merry Christmas
        </h1>
      </header>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Bottom Left: Upload Button */}
      {!hasPhotos && (
        <div className="absolute bottom-8 left-8 pointer-events-auto">
          <button
            onClick={handleUploadClick}
            className="group flex items-center gap-3 px-5 py-3 rounded-full border border-[#D4AF37]/50 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37] hover:bg-black/70"
          >
            <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            <span className="font-serif text-sm text-[#D4AF37]/90 tracking-wider group-hover:text-[#D4AF37] transition-colors">
              Upload Photos
            </span>
          </button>
        </div>
      )}

      {/* Bottom Center: Show Controls */}
      {hasPhotos && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          {/* Play Button */}
          {(showState === 'idle' || showState === 'stopped') && (
            <button
              onClick={onStartShow}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/50 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37] hover:bg-black/70"
            >
              <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span className="font-serif text-xs text-[#D4AF37]/80 tracking-wider">
                {showState === 'stopped' ? 'Restart' : 'Play'}
              </span>
            </button>
          )}

          {/* Waiting State */}
          {showState === 'waiting' && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-black/50 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="font-serif text-xs text-[#D4AF37]/60 tracking-wider">Open hand...</span>
            </div>
          )}

          {/* Stop Button */}
          {showState === 'playing' && (
            <button
              onClick={onStopShow}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/50 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:border-red-500 hover:bg-black/70"
            >
              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12"/>
              </svg>
              <span className="font-serif text-xs text-red-500/80 tracking-wider">Stop</span>
            </button>
          )}
        </div>
      )}

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37] opacity-50"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37] opacity-50"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#D4AF37] opacity-50"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37] opacity-50"></div>
    </div>
  );
};
