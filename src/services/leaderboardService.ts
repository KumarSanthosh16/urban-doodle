export interface Subject {
  subjectId: {
    _id: string;
    title: string;
  };
  totalMarkScored: number;
  accuracy: number;
  _id?: string;
}

export interface LeaderboardUser {
  _id: string;
  rank: number;
  totalMarkScored: number;
  accuracy: number;
  marksGained: number;
  marksLost: number;
  unansweredMarks: number;
  userId: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  subjects: Subject[];
}

export interface LeaderboardResponse {
  success: boolean;
  data: {
    results: LeaderboardUser[];
  };
  totalPages: number;
  totalResults: number;
  lastRank: number;
  userRank?: LeaderboardUser;
}

const BASE_URL = 'https://api.quizrr.in/api/hiring/leaderboard';

export async function fetchLeaderboard(
  page: number = 1,
  limit: number = 100
): Promise<LeaderboardResponse> {
  try {
    const res = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`Failed: ${res.status}`);

    const data = (await res.json()) as LeaderboardResponse;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return {
      success: false,
      data: { results: [] },
      totalPages: 0,
      totalResults: 0,
      lastRank: 0,
    };
  }
}
