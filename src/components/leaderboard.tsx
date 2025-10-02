'use client';
import { Skeleton } from '../components/ui/skeleton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { useEffect, useRef, useState } from 'react';
import { fetchLeaderboard } from '../services/leaderboardService';
import type {
  LeaderboardUser,
  LeaderboardResponse,
} from '../services/leaderboardService';
import UserFrameCard from './ui/card';

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<LeaderboardUser | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const tableRef = useRef<HTMLDivElement | null>(null);
  const userRankRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const load = async () => {
      const res: LeaderboardResponse = await fetchLeaderboard(1, 100);
      setUsers(res.data.results);
      setUserRank(res.userRank || null);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const tableElement = tableRef.current;
    const userRankElement = userRankRef.current;

    if (!tableElement || !userRankElement) return;

    const syncScroll = (source: HTMLDivElement, target: HTMLDivElement) => {
      return () => {
        target.scrollLeft = source.scrollLeft;
      };
    };

    const handleTableScroll = syncScroll(tableElement, userRankElement);
    const handleUserRankScroll = syncScroll(userRankElement, tableElement);

    tableElement.addEventListener('scroll', handleTableScroll);
    userRankElement.addEventListener('scroll', handleUserRankScroll);

    return () => {
      tableElement.removeEventListener('scroll', handleTableScroll);
      userRankElement.removeEventListener('scroll', handleUserRankScroll);
    };
  }, [loading, userRank]);

  if (loading)
    return (
      <div className='flex flex-col space-y-3 mb-23 mt-24 lg:mt-0 no-scrollbar sticky top-24'>
        <Skeleton className='h-[80vh] lg:h-[75dvh] w-11/12 mx-auto lg:w-full rounded-xl' />
      </div>
    );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className='px-3 lg:px-6'>
      <div className='py-6 hidden lg:flex gap-6 items-center'>
        {users.slice(0, 3).map((user) => (
          <UserFrameCard
            key={user._id}
            rank={user?.rank}
            name={user?.userId.name}
            profilePicture={user?.userId.profilePicture}
            totalMarkScored={user?.totalMarkScored}
            phy={user?.subjects[1].totalMarkScored}
            chem={user?.subjects[2].totalMarkScored}
            maths={user?.subjects[0].totalMarkScored}
            accuracy={user?.accuracy}
          />
        ))}
        {userRank && (
          <UserFrameCard
            rank={userRank?.rank}
            name={userRank?.userId.name}
            profilePicture={userRank?.userId.profilePicture}
            totalMarkScored={userRank?.totalMarkScored}
            phy={userRank?.subjects[1].totalMarkScored}
            chem={userRank?.subjects[2].totalMarkScored}
            maths={userRank?.subjects[0].totalMarkScored}
            accuracy={userRank?.accuracy}
            userRank
          />
        )}
      </div>

      <div
        ref={tableRef}
        className='rounded-xl border !border-[#EAF3FA] dark:!border-[#202A32] mb-23 mt-50 lg:mt-0 no-scrollbar sticky top-24 overflow-x-auto'
      >
        <Table>
          <TableHeader>
            <TableRow className='bg-[#F5F9FE] dark:bg-[#202A32]'>
              <TableHead className='text-center  w-[126px]  hidden lg:table-cell text-[#1D2933] dark:text-white text-sm leading-5 font-medium'>
                Rank
              </TableHead>
              <TableHead className='lg:min-w-[350px] text-[#1D2933] dark:text-white text-sm leading-5 font-medium'>
                Student Name
              </TableHead>
              <TableHead className='text-center w-[120px] text-[#5B6480] text-sm leading-5 font-medium'>
                Overall Score
              </TableHead>
              <TableHead className='text-center w-[100px] text-[#5B6480] text-sm leading-5 font-medium'>
                Phy
              </TableHead>
              <TableHead className='text-center w-[100px] text-[#5B6480] text-sm leading-5 font-medium'>
                Chem
              </TableHead>
              <TableHead className='text-center w-[100px] text-[#5B6480] text-sm leading-5 font-medium'>
                Maths
              </TableHead>
              <TableHead className='text-center w-[100px] text-[#5B6480] text-sm leading-5 font-medium'>
                Accuracy
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='dark:bg-[#1B2126]'>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow
                  key={user._id}
                  className={`${
                    user.rank === 1 || user.rank === 2 || user.rank === 3
                      ? 'table-row lg:hidden'
                      : ''
                  }`}
                >
                  <TableCell className='text-center hidden lg:table-cell'>
                    <span className='px-3 py-[6px] rounded-full bg-white dark:bg-[#1B2126] border'>
                      {user.rank}
                    </span>
                  </TableCell>
                  <TableCell className='flex items-center gap-4 mt-1'>
                    <img
                      src={user.userId.profilePicture}
                      alt={user.userId.name}
                      width={32}
                      height={32}
                      className='rounded-full border border-[#EAF3FA] hidden lg:block'
                    />
                    <span
                      className={`px-3 py-[6px] rounded-full ${
                        user.rank === 1
                          ? 'bg-orange-gradient-mobile text-white'
                          : user.rank === 2
                          ? 'bg-gray-gradient-mobile text-white'
                          : user.rank === 3
                          ? 'bg-red-gradient-mobile text-white'
                          : 'bg-white'
                      }  dark:bg-[#1B2126] border block lg:hidden`}
                    >
                      {user.rank}
                    </span>
                    <p className='text-sm font-bold'>{user.userId.name}</p>
                  </TableCell>
                  <TableCell className='text-center w-[120px]'>
                    <span className='px-3 py-2 rounded-full bg-[#F5F9FE] text-[#5B6480] dark:text-white text-xs leading-4 font-medium text-center flex items-center gap-1 w-fit'>
                      <span className='text-[#1D2933] text-lg leading-6 font-bold relative'>
                        {user.totalMarkScored}
                      </span>
                      <span className='hidden lg:block dark:text-[#8C949E]'>
                        / {user.subjects.length * 100}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className='text-center text-[#1D2933] dark:text-white text-lg leading-6 font-medium w-[100px]'>
                    {user.subjects[1].totalMarkScored}
                  </TableCell>
                  <TableCell className='text-center text-[#1D2933] dark:text-white text-lg leading-6 font-medium w-[100px]'>
                    {user.subjects[2].totalMarkScored}
                  </TableCell>
                  <TableCell className='text-center text-[#1D2933] dark:text-white text-lg leading-6 font-medium w-[100px]'>
                    {user.subjects[0].totalMarkScored}
                  </TableCell>
                  <TableCell className='text-center text-[#1D2933] dark:text-white text-lg leading-6 font-medium w-[100px]'>
                    {user.accuracy.toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className='text-center'>
                  No leaderboard data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className='flex py-6 justify-center items-center gap-4 w-full ml-24 md:ml-0'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={currentPage === 1}
                  className={`cursor-pointer !text-[#1D2933] dark:!text-white border border-[#D2DFEB] rounded-full disabled:cursor-not-allowed`}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationLink
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-2 py-1.5 border rounded-full cursor-pointer hidden lg:block ${
                    currentPage === i + 1
                      ? 'bg-[#432DD7]  border-[#432DD7] !text-white hover:!text-[#1D2933] dark:hover:!text-white'
                      : '!text-[#1D2933] dark:hover:!text-white bg-white border-[#D2DFEB]'
                  }`}
                >
                  {i + 1}
                </PaginationLink>
              ))}
              <PaginationItem>
                <PaginationNext
                  className='cursor-pointer !text-[#1D2933] dark:!text-white border border-[#D2DFEB] rounded-full'
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {userRank ? (
        <div
          ref={userRankRef}
          className='lg:rounded-tr-3xl lg:rounded-tl-3xl border border-[#EAF3FA] dark:border-[#29343D] backdrop-blur-lg bg-[#0058C61A] fixed lg:sticky left-0 bottom-0 w-full overflow-x-auto'
        >
          <Table>
            <TableBody>
              <TableRow key={userRank._id} className='hover:!bg-transparent'>
                <TableCell className='text-center font-medium w-[126px] hidden lg:table-cell'>
                  <span className='px-3 py-[9px] rounded-full bg-white dark:bg-[#1B2126] border'>
                    {userRank.rank}
                  </span>
                </TableCell>
                <TableCell className='flex items-center gap-4 mt-1 lg:min-w-[350px]'>
                  <img
                    src={userRank.userId.profilePicture}
                    alt={userRank.userId.name}
                    width={32}
                    height={32}
                    className='rounded-full border border-[#EAF3FA] hidden lg:block'
                  />
                  <span className='px-3 py-[9px] rounded-full bg-white dark:bg-[#1B2126] border block lg:hidden'>
                    {userRank.rank}
                  </span>
                  <p className='text-sm font-bold'>{userRank.userId.name}</p>
                </TableCell>
                <TableCell className='text-center w-[120px]'>
                  <span className='px-3 py-2 rounded-full bg-[#F5F9FE] text-[#5B6480] text-xs font-medium flex items-center gap-1 w-fit'>
                    <span className='text-[#1D2933] text-lg font-bold'>
                      {userRank.totalMarkScored}
                    </span>
                    <span className='hidden lg:block'>
                      / {userRank.subjects.length * 100}
                    </span>
                  </span>
                </TableCell>
                <TableCell className='text-center text-[#1D2933] dark:text-white text-lg leading-6 font-medium w-[100px]'>
                  {userRank.subjects[1].totalMarkScored}
                </TableCell>
                <TableCell className='text-center text-[#1D2933] dark:text-white text-lg leading-6 font-medium w-[100px]'>
                  {userRank.subjects[2].totalMarkScored}
                </TableCell>
                <TableCell className='text-center text-[#1D2933] dark:text-white text-lg leading-6 font-medium w-[100px]'>
                  {userRank.subjects[0].totalMarkScored}
                </TableCell>
                <TableCell className='text-center text-[#1D2933] dark:text-white text-lg leading-6 font-medium w-[100px]'>
                  {userRank.accuracy.toFixed(1)}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className='flex flex-col space-y-3 fixed lg:sticky left-0 bottom-0 w-full'>
          <Skeleton className='h-[8dvh] w-full rounded-xl' />
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
