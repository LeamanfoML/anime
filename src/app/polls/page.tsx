'use client'; // Add this

import React, { useState } from 'react';

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 1,
      question: 'What is your favorite anime genre?',
      options: [
        { id: 1, text: 'Action', votes: 120 },
        { id: 2, text: 'Fantasy', votes: 90 },
        { id: 3, text: 'Slice of Life', votes: 50 },
        { id: 4, text: 'Mecha', votes: 30 },
      ],
      totalVotes: 290,
    },
    {
      id: 2,
      question: 'Which manga character would you like to see animated next?',
      options: [
        { id: 1, text: 'Denji (Chainsaw Man)', votes: 80 },
        { id: 2, text: 'Guts (Berserk)', votes: 150 },
        { id: 3, text: 'Thorfinn (Vinland Saga)', votes: 70 },
      ],
      totalVotes: 300,
    },
  ]);

  const handleVote = (pollId: number, optionId: number) => {
    setPolls(prevPolls =>
      prevPolls.map(poll =>
        poll.id === pollId
          ? {
              ...poll,
              options: poll.options.map(option =>
                option.id === optionId ? { ...option, votes: option.votes + 1 } : option
              ),
              totalVotes: poll.totalVotes + 1,
            }
          : poll
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Polls & Voting</h1>

      <div className="space-y-8">
        {polls.map(poll => (
          <div key={poll.id} className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">{poll.question}</h2>
            <div className="space-y-3">
              {poll.options.map(option => (
                <div key={option.id} className="flex items-center gap-4">
                  <button
                    onClick={() => handleVote(poll.id, option.id)}
                    className="bg-anime-primary hover:bg-anime-primary/80 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Vote
                  </button>
                  <div className="flex-grow">
                    <p className="text-gray-300">{option.text}</p>
                    <div className="w-full bg-white/10 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-anime-primary h-2.5 rounded-full"
                        style={{ width: `${(option.votes / poll.totalVotes) * 100 || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400">{option.votes} votes ({(option.votes / poll.totalVotes * 100 || 0).toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-4">Total Votes: {poll.totalVotes}</p>
          </div>
        ))}
        {polls.length === 0 && (
          <p className="text-gray-500 text-center">No active polls at the moment.</p>
        )}
      </div>
    </div>
  );
}