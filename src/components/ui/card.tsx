import {
  Atom,
  Flask,
  MathOperations,
  Target,
  Checks,
} from '@phosphor-icons/react';

interface CardProps {
  rank: number;
  name: string;
  profilePicture: string;
  totalMarkScored: number;
  phy: number;
  chem: number;
  maths: number;
  accuracy: number;
  userRank?: boolean;
}

function getOrdinalSuffix(n: number): 'st' | 'nd' | 'rd' | 'th' {
  const v = Math.abs(n);
  const mod100 = v % 100;
  if (mod100 >= 11 && mod100 <= 13) return 'th';
  switch (v % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

const UserFrameCard = ({
  rank,
  name,
  profilePicture,
  totalMarkScored,
  phy,
  chem,
  maths,
  accuracy,
  userRank,
}: CardProps) => {
  return (
    <div
      className={`p-[1.5px] rounded-tl-3xl rounded-tr-3xl flex-1 ${
        rank === 1
          ? 'bg-yellow-gradient-border'
          : rank === 2
          ? 'bg-gray-gradient-border'
          : rank === 3
          ? 'bg-orange-gradient-border'
          : 'bg-user-gradient-border'
      } `}
    >
      <div
        className={`rounded-tl-[22px] rounded-tr-[22px] ${
          rank === 1
            ? 'bg-yellow-gradient'
            : rank === 2
            ? 'bg-gray-gradient'
            : rank === 3
            ? 'bg-orange-gradient'
            : 'bg-user-gradient'
        }  flex flex-col justify-around gap-6  py-6`}
      >
        <div className='flex flex-col items-center gap-4 relative'>
          <div className='relative'>
            <img
              src={profilePicture}
              alt={name}
              width={64}
              height={64}
              className={`rounded-full border-2 border-[#EAF3FA] ${
                'badge-' + rank
              }`}
            />
            {rank === 1 || rank === 2 || rank === 3 ? (
              <img
                src={'../src/assets/rank-' + rank + '.png'}
                alt={rank + ' Rank'}
                width={24}
                height={24}
                className={`absolute left-1/2 -translate-x-1/2 -bottom-6`}
              />
            ) : null}
          </div>
          <p className='text-lg leading-6 font-bold text-[#1D2933] dark:text-white pt-6'>
            {name} {userRank && ' (You)'}
          </p>
          <p
            className={`text-sm leading-5 font-medium py-1 px-3 rounded-full ${
              rank === 1
                ? 'bg-[#FEF9C2] text-[#733E0A]'
                : rank === 2
                ? 'bg-[#0058C61A] text-[#1D2933] dark:text-white'
                : rank === 3
                ? 'bg-[#FFEDD4] text-[#F54A00]'
                : 'bg-[#F5F9FE] text-[#1D2933]'
            } `}
          >
            {rank}
            <sup>{getOrdinalSuffix(rank)} </sup>
            Rank
          </p>
        </div>
        <div className='flex flex-col items-center justify-between gap-4'>
          <div className='flex justify-between items-center w-full px-4 text-sm leading-4 font-medium text-[#5B6480]'>
            <div className=' flex items-center gap-2'>
              <Checks size={23} className='text-black dark:text-white' />
              Overall Score
            </div>
            <div className='flex items-center gap-1'>
              <span className='text-lg leading-6 font-bold text-[#1D2933] dark:text-white'>
                {totalMarkScored}
              </span>{' '}
              / 300
            </div>
          </div>
          <div className='flex justify-between items-center w-full px-4 text-sm leading-4 font-medium text-[#5B6480] '>
            <div className='flex items-center gap-2'>
              <Atom size={23} className='text-[#009966]' />
              Phy Score
            </div>
            <div className=''>{phy}</div>
          </div>
          <div className='flex justify-between items-center w-full px-4 text-sm leading-4 font-medium text-[#5B6480] '>
            <div className='flex items-center gap-2'>
              <Flask size={23} className='text-[#F54A00]' />
              Chem Score
            </div>
            <div className=''>{chem}</div>
          </div>
          <div className='flex justify-between items-center w-full px-4 text-sm leading-4 font-medium text-[#5B6480] '>
            <div className='flex items-center gap-2'>
              <MathOperations size={23} className='text-[#155DFC]' />
              Maths Score
            </div>
            <div className=''>{maths}</div>
          </div>
          <div className='flex justify-between items-center w-full px-4 text-sm leading-4 font-medium text-[#5B6480] '>
            <div className='flex items-center gap-2'>
              <Target size={23} className='text-[#C800DE]' />
              Accuracy
            </div>
            <div className=''>{accuracy.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFrameCard;
