'use client';

import { useState } from 'react';

interface ZoomableImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    onError?: () => void;
}

export default function ZoomableImage({ src, alt, className = "", style, onError }: ZoomableImageProps) {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <>
            <div
                className="relative group cursor-zoom-in overflow-hidden rounded-md"
                onClick={() => setIsZoomed(true)}
            >
                <img
                    src={src}
                    alt={alt}
                    className={`w-full transition-transform duration-500 group-hover:scale-[1.02] ${className}`}
                    style={style}
                    onError={onError}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                    <div className="bg-white/95 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-xl opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                        🔍
                    </div>
                </div>
            </div>

            {isZoomed && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-zoom-out"
                    onClick={() => setIsZoomed(false)}
                >
                    <div className="relative max-w-6xl w-full max-h-[95vh] flex justify-center items-center">
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg"
                        />
                        <button
                            className="absolute -top-12 right-0 sm:-right-8 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors shadow-lg"
                            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                            title="Close Zoom"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
