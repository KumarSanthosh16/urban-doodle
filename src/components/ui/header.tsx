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
      className={`p-6 flex justify-between items-start flex-col gap-4 fixed lg:sticky top-0 mx-auto z-50 transition-all duration-300 bg-white dark:bg-[#1B2126CC] w-full ${
        isScrolled
          ? 'border border-[#EAF3FA] rounded-br-2xl rounded-bl-2xl'
          : 'border border-transparent'
      }`}
    >
      <div
        className={`flex ${
          isScrolled
            ? 'flex-row items-center'
            : 'flex-row lg:flex-col items-center lg:items-start'
        }  gap-6 transition-all duration-200`}
      >
        <div className='bg-rank-color rounded-full p-2'>
          <ArrowLeft className='w-6 h-6 dark:text-white text-[#1D2933]' />
        </div>
        <div className='text-2xl leading-8 font-bold text-[#1D2933] dark:text-white'>
          Leaderboard
        </div>
      </div>
      {!isScrolled && (
        <p className='text-xs leading-4 text-[#5B6480] dark:text-[#8C949E] hidden lg:block'>
          JEE Main Test series / Quizrr Part Test / Quizrr Part Test (QPT) - 1
          (Old) / Analysis / Leaderboard
        </p>
      )}
    </div>
  );
};

export default Header;
