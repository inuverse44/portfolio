import React, { forwardRef } from 'react';

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean;
  controlsId?: string;
}

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ open, controlsId = 'mobile-menu', children = 'Menu', ...rest }, ref) => {
    return (
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={controlsId}
        ref={ref}
        {...rest}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {children}
      </button>
    );
  }
);

MenuButton.displayName = 'MenuButton';

export default MenuButton;

