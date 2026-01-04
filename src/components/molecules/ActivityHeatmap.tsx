import React, { useState } from 'react';
import styles from './ActivityHeatmap.module.css';

interface ActivityHeatmapProps {
  activities: Record<string, number>; // ISO Date String -> count
  today: string; // ISO date string from server/props to avoid hydration mismatch
}

type RangeType = 'all' | '1y' | '6m' | '1m' | '2w' | '1w';

const ActivityHeatmap = ({ activities, today: todayStr }: ActivityHeatmapProps) => {
  const [range, setRange] = useState<RangeType>('1y');
  const today = new Date(todayStr);

  const getStartDate = () => {
    const start = new Date(today);
    switch (range) {
      case 'all': {
        const dates = Object.keys(activities).sort();
        if (dates.length > 0) {
          const firstPost = new Date(dates[0]);
          firstPost.setDate(firstPost.getDate() - firstPost.getDay());
          return firstPost;
        }
        start.setFullYear(today.getFullYear() - 1);
        break;
      }
      case '1y':
        start.setFullYear(today.getFullYear() - 1);
        break;
      case '6m':
        start.setMonth(today.getMonth() - 6);
        break;
      case '1m':
        start.setMonth(today.getMonth() - 1);
        break;
      case '2w':
        start.setDate(today.getDate() - 14);
        break;
      case '1w':
        start.setDate(today.getDate() - 7);
        break;
    }
    start.setDate(start.getDate() - start.getDay()); // Align to Sunday
    return start;
  };

  const startDate = getStartDate();
  const days = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= today) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    days.push({
      date: dateStr,
      count: activities[dateStr] || 0
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const getLevel = (count: number) => {
    if (count === 0) return styles.level0;
    if (count === 1) return styles.level1;
    if (count === 2) return styles.level2;
    if (count === 3) return styles.level3;
    return styles.level4;
  };

  const ranges: { label: string; value: RangeType }[] = [
    { label: 'All', value: 'all' },
    { label: '1Y', value: '1y' },
    { label: '6M', value: '6m' },
    { label: '1M', value: '1m' },
    { label: '2W', value: '2w' },
    { label: '1W', value: '1w' },
  ];

  return (
    <div className={styles.heatmapContainer}>
      <div className={styles.header}>
        <div className={styles.heatmapTitle}>Posting Activity</div>
        <div className={styles.rangePicker}>
          {ranges.map((r) => (
            <button
              key={r.value}
              className={`${styles.rangeButton} ${range === r.value ? styles.active : ''}`}
              onClick={() => setRange(r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.grid}>
        {days.map((day) => (
          <div
            key={day.date}
            className={`${styles.cell} ${getLevel(day.count)}`}
            title={`${day.date}: ${day.count} posts`}
          />
        ))}
      </div>
      <div className={styles.labels}>
        <span>{startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}</span>
        <span>{today.toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
