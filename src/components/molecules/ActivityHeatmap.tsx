import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Post } from '@/lib/posts/api';
import styles from './ActivityHeatmap.module.css';

interface ActivityHeatmapProps {
  activities: Record<string, Post[]>;
  today: string;
}



const ActivityHeatmap = ({ activities, today: todayStr }: ActivityHeatmapProps) => {
  const today = new Date(todayStr);
  const currentYear = today.getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const [hoveredData, setHoveredData] = useState<{ date: string; posts: Post[]; x: number; y: number; isFlip: boolean } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close picker when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const container = containerRef.current;
      if (isYearPickerOpen && container && !container.contains(e.target as Node)) {
        setIsYearPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isYearPickerOpen]);

  // Scroll to the end (latest activity) when year changes
  React.useEffect(() => {
    if (gridWrapperRef.current) {
      gridWrapperRef.current.scrollLeft = gridWrapperRef.current.scrollWidth;
    }
  }, [selectedYear]);

  const getStartDate = () => {
    // Start from Jan 1st of the selected year, but aligned to the previous Sunday
    const start = new Date(selectedYear, 0, 1);
    start.setDate(start.getDate() - start.getDay());
    return start;
  };

  const getEndDate = () => {
    // End at Dec 31st of the selected year, but if it's the current year, end at today
    if (selectedYear === currentYear) {
      return today;
    }
    return new Date(selectedYear, 11, 31);
  };

  const startDate = getStartDate();
  const endDate = getEndDate();
  const days = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    days.push({ date: dateStr, posts: activities[dateStr] || [] });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const getLevel = (count: number) => {
    if (count === 0) return styles.level0;
    if (count <= 1) return styles.level1;
    if (count <= 2) return styles.level2;
    if (count <= 4) return styles.level3;
    return styles.level4;
  };

  const handleCellClick = (posts: Post[]) => {
    if (posts.length === 1) {
      router.push(`/posts/${posts[0].slug}`);
    } else if (posts.length > 1) {
      router.push(`/blog?date=${posts[0].frontmatter.date}`);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent, date: string, posts: Post[], index: number) => {
    if (posts.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const isTopRow = (index % 7) < 3;
      setHoveredData({
        date,
        posts,
        x: rect.left - containerRect.left + rect.width / 2,
        y: isTopRow ? rect.bottom - containerRect.top : rect.top - containerRect.top,
        isFlip: isTopRow
      });
    }
  };

  // Get available years from activities
  const availableYears = Array.from(new Set([
    currentYear,
    ...Object.keys(activities).map(d => new Date(d).getFullYear())
  ])).sort((a, b) => b - a);

  return (
    <div className={styles.heatmapOuter}>
      <div className={styles.heatmapContainer} ref={containerRef}>
        <div className={styles.header}>
          <div className={styles.heatmapTitle}>Posting Activity</div>
          <div className={styles.yearPickerContainer}>
            <button 
              className={styles.yearDropdownButton}
              onClick={() => setIsYearPickerOpen(!isYearPickerOpen)}
            >
              {selectedYear}
              <span className={styles.dropdownIcon}>{isYearPickerOpen ? '▲' : '▼'}</span>
            </button>
            {isYearPickerOpen && (
              <div className={styles.yearDropdown}>
                {availableYears.map((year) => (
                  <button
                    key={year}
                    className={`${styles.yearOption} ${selectedYear === year ? styles.selected : ''}`}
                    onClick={() => {
                      setSelectedYear(year);
                      setIsYearPickerOpen(false);
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.gridWrapper} ref={gridWrapperRef}>
          <div className={styles.grid}>
            {days.map((day, i) => (
              <div
                key={day.date}
                className={`${styles.cell} ${getLevel(day.posts.length)}`}
                onMouseEnter={(e) => handleMouseEnter(e, day.date, day.posts, i)}
                onMouseLeave={() => setHoveredData(null)}
                onClick={() => handleCellClick(day.posts)}
              />
            ))}
          </div>
        </div>
        
        {hoveredData && (
          <div 
            className={`${styles.tooltip} ${hoveredData.isFlip ? styles.tooltipFlip : ''}`}
            style={{ left: `${hoveredData.x}px`, top: `${hoveredData.y}px` }}
          >
            <div className={styles.tooltipDate}>{hoveredData.date}</div>
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.labels}>
            <span>{startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}</span>
            <span>{endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}</span>
          </div>
          <div className={styles.detailsArea}>
            {hoveredData && hoveredData.posts.length > 0 ? (
              <div className={styles.activeDetails}>
                <div className={styles.detailsHeader}>
                  <span className={styles.detailsDate}>{hoveredData.date}</span>
                  <span className={styles.detailsCount}>{hoveredData.posts.length} posts</span>
                </div>
                <div className={styles.detailsPosts}>
                  {hoveredData.posts.map((post) => (
                    <div 
                      key={post.slug} 
                      className={styles.detailsPost}
                      onClick={() => router.push(`/posts/${post.slug}`)}
                    >
                      • {post.frontmatter.title}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.placeholderDetails}>
                Hover over a square to see activity details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
