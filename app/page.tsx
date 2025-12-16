"use client";

import { useState, useEffect } from "react";

// ✅ UPDATED DATA STRUCTURE
// Now includes Title and Subtitle for every image.
const AD_SLIDES = [
    {
        src: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2000&auto=format&fit=crop",
        title: "Betala Enkelt",
        subtitle: "Använd Swish eller kort direkt i mobilen för smidiga köp.",
    },
    {
        src: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2000&auto=format&fit=crop",
        title: "Ladda Framtiden",
        subtitle: "Våra nya snabbladdare är nu installerade och redo.",
    },
    {
        src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop",
        title: "Premium Service",
        subtitle: "Vi tar hand om din bil så att den håller längre.",
    },
    {
        src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop",
        title: "Helt Digitalt",
        subtitle: "Inga papperskvitton, ingen väntetid. Allt i appen.",
    },
    {
        src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop",
        title: "Öppet Dygnet Runt",
        subtitle: "Våra stationer är alltid öppna när du behöver dem.",
    },
];

export default function KioskStation() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [qrImage, setQrImage] = useState<string | null>(null);

    // 🔁 Rotation Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % AD_SLIDES.length);
        }, 10000); // 10 Seconds

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
        <main className="relative h-screen w-screen overflow-hidden bg-zinc-900 font-sans text-zinc-900">
            {/* ================= BACKGROUND / ADS LOOP ================= */}
            <div className="absolute inset-0 z-0 bg-black">
                {AD_SLIDES.map((slide, index) => (
                    <div
                        key={slide.src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentIndex
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0"
                        }`}
                    >
                        {/* Dark overlay to make text readable */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 z-10" />

                        {/* The Image */}
                        <img
                            src={slide.src}
                            alt={slide.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />

                        {/* ================= NEW: TITLE & SUBTITLE ================= */}
                        {/* Placed Bottom Left to balance the Bottom Right QR Card */}
                        <div className="absolute bottom-12 left-12 z-20 max-w-[55%] pb-4">
                            <h1 className="text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-lg text-balance leading-[0.9]">
                                {slide.title}
                            </h1>
                            <p className="text-xl lg:text-2xl text-zinc-100 font-medium leading-snug drop-shadow-md text-balance opacity-90">
                                {slide.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= QR CARD ================= */}
            <div className="absolute z-30 bottom-8 right-8 flex flex-col items-end">
                <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/50 max-w-xs text-center">
                    <h2 className="text-lg font-black uppercase tracking-tight mb-1 text-zinc-900">
                        Registrera din bil
                    </h2>

                    <p className="text-xs text-zinc-500 mb-4 font-medium leading-tight">
                        Skanna för att registrera <br /> snabbt i mobilen.
                    </p>
                    {/* QR Code */}
                    <div className="bg-white p-2 rounded-xl border border-zinc-100 shadow-inner inline-block relative">
                        {qrImage ? (
                            <img
                                src={qrImage}
                                alt="Scan to go to /stations/scan"
                                // CHANGE: Reduced size from size-48 to size-32 (approx 128px)
                                className="size-32 object-contain mix-blend-multiply"
                            />
                        ) : (
                            <div className="size-32 flex items-center justify-center text-zinc-400 text-xs">
                                Loading...
                            </div>
                        )}

                        {/* Pulse indicator (adjusted size) */}
                        <div className="absolute -top-1 -right-1 size-3 bg-blue-500 rounded-full animate-ping" />
                        <div className="absolute -top-1 -right-1 size-3 bg-blue-500 rounded-full border-2 border-white" />
                    </div>

                    {/* ================= CONTACT INFO ================= */}
                    <div className="pt-3 mt-3 border-t border-zinc-100">
                        <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                            Vill du synas här?{" "}
                            <span className="text-zinc-800 block mt-0.5 text-[10px]">
                                info@serima.se
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
