import React, { useEffect, useRef } from 'react';
import Navigation from '@/components/molecules/Navigation';
import styles from './MobileSidebar.module.css';

interface MobileSidebarProps {
  open: boolean;
  items: { label: string; href: string }[];
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLButtonElement | null>;
}

const getTabbables = (container: HTMLElement): HTMLElement[] => {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
};

const MobileSidebar = ({ open, items, onClose, returnFocusRef }: MobileSidebarProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap and ESC to close
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    // Focus first tabbable
    const tabbables = getTabbables(panel);
    (tabbables[0] ?? panel).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = getTabbables(panel);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Return focus to opener on close
  useEffect(() => {
    if (!open && returnFocusRef?.current) {
      returnFocusRef.current.focus();
    }
  }, [open, returnFocusRef]);

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
        aria-hidden={!open}
        onClick={onClose}
      />
      <aside
        id="mobile-menu"
        className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}
        role="dialog"
        aria-modal={open}
        aria-label="Site navigation"
        onClick={(e) => e.stopPropagation()}
        ref={panelRef}
        tabIndex={-1}
      >
        <Navigation items={items} orientation="vertical" onNavigate={onClose} />
      </aside>
    </>
  );
};

export default MobileSidebar;
