'use client';
import React, { useState } from 'react';

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  timestamp: string;
}

export default function RatingReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, author: 'Reviewer1', rating: 9, text: 'Absolutely loved this! A must-watch/read.', timestamp: '2025-08-26 11:00' },
    { id: 2, author: 'Reviewer2', rating: 7, text: 'Good, but had some pacing issues.', timestamp: '2025-08-26 11:30' },
  ]);
  const [newRating, setNewRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating > 0 && newReviewText.trim()) {
      const newReview: Review = {
        id: reviews.length + 1,
        author: 'Current User (You)', // Placeholder for current user
        rating: newRating,
        text: newReviewText.trim(),
        timestamp: new Date().toLocaleString(),
      };
      setReviews([...reviews, newReview]);
      setNewRating(0);
      setNewReviewText('');
    }
  };

  return (
    <div className="mt-8 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Ratings & Reviews</h2>

      <div className="space-y-4 mb-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-purple-400">{review.author}</span>
                <span className="text-sm text-gray-400">⭐ {review.rating}/10</span>
              </div>
              <p className="text-gray-300">{review.text}</p>
              <span className="text-xs text-gray-500 block mt-2">{review.timestamp}</span>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="rating" className="text-white">Your Rating:</label>
          <select
            id="rating"
            className="p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-purple-400"
            value={newRating}
            onChange={(e) => setNewRating(parseInt(e.target.value))}
          >
            <option value="0">Select</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <textarea
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-purple-400"
          rows={3}
          placeholder="Write your review..."
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold self-end"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}