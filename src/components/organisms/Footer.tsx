import { SITE_TITLE } from '@/constants/site';

const Footer = () => {
  return (
    <footer>
      <p>© {new Date().getFullYear()} {SITE_TITLE}</p>
      <div className="social-links">
        <a href="https://twitter.com/mochi_dog_phys" target="_blank" rel="noopener noreferrer">X</a>
        <a href="https://github.com/inuverse44" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://note.com/inunoute_scitech" target="_blank" rel="noopener noreferrer">note</a>
      </div>
    </footer>
  );
};

export default Footer;
