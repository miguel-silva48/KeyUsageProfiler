import logo from '../../assets/key_usage_profiler_logo.svg';
import { RiGithubFill, RiInstagramFill,RiFacebookBoxFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content bottom-0">
      <aside>
        <img className='w-[10vw] bg-slate-300' src={logo} />
        <h2>
          Key Usage Profiler
          <br />
          Tracking your keystrokes since 2023
        </h2>
      </aside>
      <nav>
        <header className="footer-title">Social</header>
        <div className="grid grid-flow-col gap-4">
          <a href='#'>
            <RiGithubFill className='text-xl' />
          </a>
          <a href='#'>
            <RiInstagramFill className='text-xl' />
          </a>
          <a href='#'>
            <RiFacebookBoxFill className='text-xl' />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
