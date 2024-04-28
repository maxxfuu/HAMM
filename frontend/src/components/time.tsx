'use client';

interface TimeProps {
  timestamp: number;
}

export function Time({ timestamp }: TimeProps) {
  const dateObj = new Date(`${timestamp} UTC`);
  return (
    <time dateTime={dateObj.toISOString()} className="tabular-nums">
      {dateObj.toLocaleString()}
    </time>
  );
}
