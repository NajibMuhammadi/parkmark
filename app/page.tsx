"use client";

import { useState, useEffect } from "react";

// Sample images to simulate the "Rotating Ad" requirement
const AD_IMAGES = [
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2000&auto=format&fit=crop&sig=1",
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2000&auto=format&fit=crop&sig=2",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop&sig=3",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop&sig=4",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop&sig=5",
];

export default function KioskStation() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [qrImage, setQrImage] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % AD_IMAGES.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // ✅ Generate QR code ONLY on client
    useEffect(() => {
        const targetUrl = `${window.location.origin}/stations/scan`;
        const qr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(
            targetUrl
        )}`;
        setQrImage(qr);
    }, []);

    return (
        <main className="relative h-screen w-screen overflow-hidden bg-zinc-900 font-sans">
            {/* ================= BACKGROUND / ADS ================= */}
            <div className="absolute inset-0 z-0 bg-zinc-800">
                {AD_IMAGES.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex
                                ? "opacity-100"
                                : "opacity-0"
                        }`}
                    >
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/30 z-10" />

                        {/* The Image */}
                        <img
                            src={src}
                            alt="Announcement Background"
                            className="h-full w-full object-cover"
                            // If an image fails to load, this prevents a broken icon
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                                console.error(`Failed to load image: ${src}`);
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* ================= QR CARD ================= */}
            <div className="absolute z-20 bottom-12 right-12 flex flex-col items-end">
                <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 max-w-sm text-center">
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-2 text-zinc-900">
                        Registrera din bil
                    </h2>

                    <p className="text-sm text-zinc-500 mb-6 font-medium leading-tight">
                        Skanna QR-koden för att registrera din bil
                        <br />
                        snabbt och enkelt i mobilen.
                    </p>

                    {/* QR Code */}
                    <div className="bg-white p-2 rounded-xl border border-zinc-100 shadow-inner inline-block relative">
                        {qrImage ? (
                            <img
                                src={qrImage}
                                alt="Scan to go to /stations/scan"
                                className="size-48 object-contain mix-blend-multiply"
                            />
                        ) : (
                            <div className="size-48 flex items-center justify-center text-zinc-400 text-sm">
                                Loading QR…
                            </div>
                        )}

                        {/* Pulse indicator */}
                        <div className="absolute -top-1 -right-1 size-4 bg-blue-500 rounded-full animate-ping" />
                        <div className="absolute -top-1 -right-1 size-4 bg-blue-500 rounded-full border-2 border-white" />
                    </div>

                    {/* ================= CONTACT INFO ================= */}
                    <div className="pt-4 border-t border-zinc-100">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                            Vill du synas här?{" "}
                            <span className="text-zinc-800 block mt-1 text-xs">
                                info@serima.se
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
