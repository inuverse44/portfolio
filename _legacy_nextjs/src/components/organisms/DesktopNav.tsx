import React from 'react';
import Navigation from '@/components/molecules/Navigation';

interface DesktopNavProps {
  items: { label: string; href: string }[];
  className?: string;
}

const DesktopNav = ({ items, className }: DesktopNavProps) => {
  return (
    <nav className={className} aria-label="Primary">
      <Navigation items={items} />
    </nav>
  );
};

export default DesktopNav;

