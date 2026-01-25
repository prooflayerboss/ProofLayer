'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ endDate }: { endDate: Date }) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = endDate.getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!mounted) {
    return (
      <div className="flex gap-3 justify-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[70px] border border-white/30">
              <div className="text-3xl font-bold text-white">00</div>
            </div>
            <div className="text-xs text-white/80 mt-1">Loading</div>
          </div>
        ))}
      </div>
    );
  }

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isExpired) {
    return (
      <div className="text-center py-4">
        <p className="text-white font-semibold text-lg">Offer Ended</p>
      </div>
    );
  }

  return (
    <div className="flex gap-3 justify-center">
      <div className="flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[70px] border border-white/30 shadow-lg">
          <div className="text-3xl font-bold text-white tabular-nums">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
        </div>
        <div className="text-xs text-white/80 mt-1 font-medium">Days</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[70px] border border-white/30 shadow-lg">
          <div className="text-3xl font-bold text-white tabular-nums">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
        </div>
        <div className="text-xs text-white/80 mt-1 font-medium">Hours</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[70px] border border-white/30 shadow-lg">
          <div className="text-3xl font-bold text-white tabular-nums">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
        </div>
        <div className="text-xs text-white/80 mt-1 font-medium">Minutes</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[70px] border border-white/30 shadow-lg">
          <div className="text-3xl font-bold text-white tabular-nums">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
        <div className="text-xs text-white/80 mt-1 font-medium">Seconds</div>
      </div>
    </div>
  );
}
