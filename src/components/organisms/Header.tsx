import { SITE_TITLE, NAV_ITEMS } from '@/constants/site';

const Header = () => {
  return (
    <header>
      <a href="/" className="site-title">{SITE_TITLE}</a>
      <nav>
        {NAV_ITEMS.filter((item) => item.href !== '/').map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
