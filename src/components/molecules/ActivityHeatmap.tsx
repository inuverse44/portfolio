import React from 'react';
import styles from './ActivityHeatmap.module.css';

interface ActivityHeatmapProps {
  activities: Record<string, number>; // ISO Date String -> count
}

const ActivityHeatmap = ({ activities }: ActivityHeatmapProps) => {
  const today = new Date();
  const startDate = new Date();
  startDate.setFullYear(today.getFullYear() - 1);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Align to Sunday

  const days = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split('T')[0];
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

  return (
    <div className={styles.heatmapContainer}>
      <div className={styles.heatmapTitle}>Posting Activity</div>
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
        <span>{startDate.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
        <span>{today.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
