'use client';
import React, { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  contentTimestamp?: string; // New field for timestamp within content
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'AnimeFan2025', text: 'This episode was amazing! Loved the animation.', timestamp: '2025-08-26 10:00', contentTimestamp: '0:45' },
    { id: 2, author: 'MangaReaderX', text: 'The plot twists are getting intense!', timestamp: '2025-08-26 10:15' },
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [newContentTimestamp, setNewContentTimestamp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        author: 'Current User (You)', // Placeholder for current user
        text: newCommentText.trim(),
        timestamp: new Date().toLocaleString(),
        contentTimestamp: newContentTimestamp.trim() || undefined,
      };
      setComments([...comments, newComment]);
      setNewCommentText('');
      setNewContentTimestamp('');
    }
  };

  return (
    <div className="mt-8 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Comments</h2>

      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-purple-400">{comment.author}</span>
                <span className="text-sm text-gray-400">{comment.timestamp}</span>
              </div>
              <p className="text-gray-300">
                {comment.contentTimestamp && (
                  <span className="text-blue-400 hover:underline cursor-pointer mr-2">[{comment.contentTimestamp}]</span>
                )}
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-purple-400"
          placeholder="Optional: Add a timestamp (e.g., 0:45)"
          value={newContentTimestamp}
          onChange={(e) => setNewContentTimestamp(e.target.value)}
        />
        <textarea
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-purple-400"
          rows={3}
          placeholder="Add a comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold self-end"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}