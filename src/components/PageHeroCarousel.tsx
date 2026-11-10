import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import heroImage from '../assets/images/hero_executive_corporate_1793911532663.jpg';
import staffingImage from '../assets/images/service_contract_staffing_1793911533906.jpg';
import executiveSearchImage from '../assets/images/service_executive_search_1793911534916.jpg';
import workplaceAuditImage from '../assets/images/workplace_audit_safety_1793911535061.jpg';

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=85`;

const trainingImage = unsplash('photo-1524178232363-1fb2b075b655');
const eventImage = unsplash('photo-1511795409834-ef04bbd61622');
const onboardingImage = unsplash('photo-1521737711867-e3b97375f902');
const teamImage = unsplash('photo-1521737604893-d14cc237f11d');
const meetingImage = unsplash('photo-1551836022-d5d88e9218df');
const officeImage = unsplash('photo-1497366754035-f200968a6e72');
const planningImage = unsplash('photo-1454165804606-c3d57bc86b40');
const technologyImage = unsplash('photo-1581092160562-40aa08e78837');
const teamWorkImage = unsplash('photo-1504384308090-c894fdcc538d');

const slidesByPage: Record<string, string[]> = {
  home: [heroImage, staffingImage, executiveSearchImage],
  about: [executiveSearchImage, teamImage, meetingImage],
  services: [staffingImage, eventImage, workplaceAuditImage],
  industries: [workplaceAuditImage, technologyImage, officeImage],
  'how-we-work': [planningImage, trainingImage, onboardingImage],
  jobs: [onboardingImage, teamWorkImage, executiveSearchImage],
  contact: [officeImage, teamImage, eventImage],
};

interface PageHeroCarouselProps {
  page: string;
  className?: string;
  imageOnly?: boolean;
  children?: React.ReactNode;
}

export const PageHeroCarousel: React.FC<PageHeroCarouselProps> = ({
  page,
  className = '',
  imageOnly = false,
  children,
}) => {
  const slides = slidesByPage[page] || slidesByPage.home;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isPlaying, slides.length]);

  const move = (direction: number) => {
    setActiveIndex((index) => (index + direction + slides.length) % slides.length);
  };

  return (
    <section
      aria-label={page.replace('-', ' ') + ' image carousel'}
      aria-roledescription="carousel"
      onFocusCapture={() => setIsPlaying(false)}
      className={['relative isolate overflow-hidden bg-[#081B30] text-white', className].filter(Boolean).join(' ')}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className={['absolute inset-0 h-full w-full object-cover transition-opacity duration-1000', activeIndex === index ? 'opacity-100' : 'opacity-0'].join(' ')}
          />
        ))}
        <div className={imageOnly
          ? 'absolute inset-0 bg-gradient-to-t from-[#07162C]/80 via-[#07162C]/20 to-[#07162C]/10'
          : 'absolute inset-0 bg-gradient-to-r from-[#07162C]/95 via-[#102A3D]/80 to-[#102A3D]/45'}
        />
        <div className="absolute inset-0 bg-[#0B1B2F]/10" />
      </div>

      {children && (imageOnly
        ? children
        : <div className="relative z-10">{children}</div>)}

      <div
        role="group"
        aria-label="Carousel controls"
        className={['absolute right-5 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-[#07162C]/45 p-1.5 shadow-lg backdrop-blur-md', imageOnly ? 'bottom-16' : 'bottom-5'].join(' ')}
      >
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => move(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#E8E0C7]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show image ${index + 1} of ${slides.length}`}
            aria-current={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            className={['h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#E8E0C7]', activeIndex === index ? 'w-6 bg-[#E8E0C7]' : 'w-2 bg-white/60 hover:bg-white'].join(' ')}
          />
        ))}
        <button
          type="button"
          aria-label={isPlaying ? 'Pause image carousel' : 'Play image carousel'}
          onClick={() => setIsPlaying((playing) => !playing)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#E8E0C7]"
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => move(1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#E8E0C7]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
