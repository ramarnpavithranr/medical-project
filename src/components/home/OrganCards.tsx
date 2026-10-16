'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function OrganCards() {
  const cards = [
    {
      id: 'brain',
      title: 'Brain Health Check',
      subtitle: 'AI Neuro-Scan',
      image: '/images/brain-3d.jpg',
      bgClass: 'bg-white border border-slate-200/90 shadow-lg shadow-blue-500/5',
      titleClass: 'text-[#0e2448]',
      subtitleClass: 'text-slate-500',
      buttonBg: 'bg-emerald-500 text-white',
      link: '#cardiology-studio'
    },
    {
      id: 'liver',
      title: 'Liver Function Test',
      subtitle: 'Hepatic Panel',
      image: '/images/liver-3d.jpg',
      bgClass: 'bg-white border border-slate-200/90 shadow-lg shadow-blue-500/5',
      titleClass: 'text-[#0e2448]',
      subtitleClass: 'text-slate-500',
      buttonBg: 'bg-emerald-500 text-white',
      link: '#cardiology-studio'
    },
    {
      id: 'kidney',
      title: 'Kidney Health Scan',
      subtitle: 'Renal Hemodynamics',
      image: '/images/kidney-3d.jpg',
      bgClass: 'bg-[#0e2448] border border-blue-900 shadow-xl shadow-blue-950/20 text-white',
      titleClass: 'text-white',
      subtitleClass: 'text-sky-300',
      buttonBg: 'bg-white text-[#0e2448]',
      link: '#cardiology-studio'
    }
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <a
            key={card.id}
            href={card.link}
            className={`group relative p-6 sm:p-7 rounded-[2.5rem] transition-all duration-300 flex items-center justify-between hover:scale-[1.02] ${card.bgClass}`}
          >
            {/* Left: Square 3D Organ Graphic Thumbnail */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900/10 flex-shrink-0 shadow-sm border border-white/40">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Center Content */}
              <div>
                <h3 className={`text-lg sm:text-xl font-black tracking-tight leading-tight mb-1 ${card.titleClass}`}>
                  {card.title}
                </h3>
                <p className={`text-xs font-semibold ${card.subtitleClass}`}>
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Top Right: Circular Arrow Action */}
            <div className="absolute top-6 right-6">
              <div className={`w-10 h-10 rounded-full ${card.buttonBg} flex items-center justify-center shadow-md transition-transform group-hover:scale-110`}>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
