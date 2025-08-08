import React, { useEffect, useMemo, useState } from "react";

interface CountdownProps {
  targetMonth: number; // 0-11
  targetDay: number;   // 1-31
}

// Returns the next occurrence of targetMonth/targetDay based on current date
function getNextOccurrence(month: number, day: number) {
  const now = new Date();
  const year = now.getMonth() > month || (now.getMonth() === month && now.getDate() > day)
    ? now.getFullYear() + 1
    : now.getFullYear();
  return new Date(year, month, day, 0, 0, 0, 0);
}

export const Countdown: React.FC<CountdownProps> = ({ targetMonth, targetDay }) => {
  const targetDate = useMemo(() => getNextOccurrence(targetMonth, targetDay), [targetMonth, targetDay]);
  const [timeLeft, setTimeLeft] = useState<number>(targetDate.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(targetDate.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (timeLeft <= 0) {
    return (
      <div className="mt-4 text-sm text-muted-foreground">The event is live! See you at the Carnival 🎉</div>
    );
  }

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const Item: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="flex flex-col items-center">
      <div className="min-w-[64px] rounded-md bg-secondary px-4 py-2 text-2xl font-semibold text-secondary-foreground shadow-sm">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1 text-xs text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <div className="mt-6 flex items-center justify-center gap-4" aria-label="Countdown to event">
      <Item label="Days" value={days} />
      <span className="text-muted-foreground">:</span>
      <Item label="Hours" value={hours} />
      <span className="text-muted-foreground">:</span>
      <Item label="Minutes" value={minutes} />
      <span className="text-muted-foreground">:</span>
      <Item label="Seconds" value={seconds} />
    </div>
  );
};

export default Countdown;
