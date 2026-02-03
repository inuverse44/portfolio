import { useEffect } from 'react';

type AdSenseProps = {
  slot?: string;
  className?: string;
  style?: React.CSSProperties;
};

const AdSense = ({ slot, className, style }: AdSenseProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // no-op
    }
  }, []);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isDev = process.env.NODE_ENV !== 'production';

  // If no slot provided, render nothing (component is for manual units)
  if (!slot || !client) return null;

  return (
    <ins
      className={`adsbygoogle${className ? ` ${className}` : ''}`}
      style={{ display: 'block', ...(style || {}) }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...(isDev ? { 'data-adtest': 'on' } : {})}
    />
  );
};

export default AdSense;
