import { ArrowLeft } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`p-6 flex justify-between items-start flex-col gap-4 fixed lg:sticky top-0 mx-auto z-50 transition-all duration-300 bg-white dark:bg-[var(--q3-surface-default-v3)] w-full ${
        isScrolled
          ? 'border border-[var(--q3-surface-default-v2)] dark:border-[var(--q3-stroke-light)] backdrop-blur-2xl rounded-br-2xl rounded-bl-2xl'
          : 'border border-transparent'
      }`}
    >
      <div
        className={`flex ${
          isScrolled ? 'flex-row items-center' : 'flex-col items-start'
        }  gap-6 transition-all duration-200`}
      >
        <div className='bg-rank-color rounded-full p-2'>
          <ArrowLeft className='w-6 h-6 dark:text-white text-[var(--q3-neutral-default)]' />
        </div>
        <div className='text-2xl leading-8 font-bold text-[var(--q3-neutral-default)] dark:text-white'>
          Leaderboard
        </div>
      </div>
      {!isScrolled && (
        <p className='text-xs leading-4 text-[var(--q3-neutral-light-v2)] dark:text-[var(--q3-stroke-dark-v2)] text-left'>
          JEE Main Test series / Quizrr Part Test / Quizrr Part Test (QPT) - 1
          (Old) / Analysis / Leaderboard
        </p>
      )}
    </div>
  );
};

export default Header;
