"use client";

import Link from "next/link";
import { BarChart3, Users, ArrowUpRight } from "lucide-react";

const menuItems = [
    {
        title: "Insite",
        description:
            "Ett system för att registrera när personer går in och ut från arbetsplatsen.",
        icon: BarChart3,
        href: "https://insite.serima.se/realtimestation",
    },
    {
        title: "Park-Mark",
        description: "En webbplats som visar parkeringsplatser.",
        icon: Users,
        href: "https://parkmark.serima.se",
    },
];

export default function NavigationHub() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-4xl space-y-10">
                {/* The Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="group relative flex flex-col justify-between p-10 bg-card-white rounded-[2.5rem] shadow-sm border border-black/5 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-accent/20 hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start">
                                {/* Icon Container */}
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-accent/30 text-text-main transition-colors duration-300 group-hover:bg-yellow-accent">
                                    <item.icon size={32} strokeWidth={1.5} />
                                </div>

                                {/* Arrow Interaction */}
                                <div className="text-gray-300 transition-colors duration-300 group-hover:text-text-main">
                                    <ArrowUpRight size={28} />
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-2xl font-bold text-text-main mb-2">
                                    {item.title}
                                </h2>
                                <p className="text-base font-medium text-text-muted">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
