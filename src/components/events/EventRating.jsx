"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/app/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export function EventRating({ eventId }) {
  const { user, isAuthenticated } = useAuth();
  const [userRating, setUserRating] = useState(null);
  const [eventStats, setEventStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchRatingData();
  }, [eventId, isAuthenticated]);

  const fetchRatingData = async () => {
    try {
      setLoading(true);

      // Fetch event ratings stats
      const statsResponse = await fetch(`${API_URL}/user/events/${eventId}/ratings`);
      const statsData = await statsResponse.json();

      if (statsData.success) {
        setEventStats(statsData.data.stats);
      }

      // Fetch user's rating if authenticated
      if (isAuthenticated) {
        const userRatingResponse = await fetch(`${API_URL}/user/events/${eventId}/my-rating`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("codexToken")}`,
          },
        });
        const userRatingData = await userRatingResponse.json();

        if (userRatingData.success && userRatingData.data) {
          setUserRating(userRatingData.data);
          setRating(userRatingData.data.rating);
          setReview(userRatingData.data.review || "");
          setIsAnonymous(userRatingData.data.isAnonymous || false);
        }
      }
    } catch (error) {
      console.error("Error fetching rating data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRating = async () => {
    if (!isAuthenticated) return;

    try {
      setSubmitting(true);
      const response = await fetch(`${API_URL}/user/events/${eventId}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("codexToken")}`,
        },
        body: JSON.stringify({
          rating,
          review: review.trim() || null,
          isAnonymous,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUserRating(data.data);
        setShowReviewForm(false);
        await fetchRatingData(); // Refresh stats
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRating = async () => {
    if (!isAuthenticated) return;

    try {
      setSubmitting(true);
      const response = await fetch(`${API_URL}/user/events/${eventId}/rate`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("codexToken")}`,
        },
      });

      if (response.ok) {
        setUserRating(null);
        setRating(0);
        setReview("");
        setIsAnonymous(false);
        await fetchRatingData(); // Refresh stats
      }
    } catch (error) {
      console.error("Error deleting rating:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Stats */}
      {eventStats && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Event Rating</h3>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= eventStats.averageRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-bold text-lg">
                {eventStats.averageRating.toFixed(1)}
              </span>
              <span className="text-gray-400">({eventStats.totalRatings} reviews)</span>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 w-8">{star}★</span>
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${eventStats.totalRatings > 0 ? (eventStats.distribution[star] / eventStats.totalRatings) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-gray-400 w-8 text-right">
                  {eventStats.distribution[star] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Rating Section */}
      {isAuthenticated ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {userRating ? "Your Rating" : "Rate This Event"}
          </h3>

          {userRating ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= userRating.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }`}
                      onClick={() => {
                        setRating(star);
                        setShowReviewForm(true);
                      }}
                    />
                  ))}
                </div>
                <span className="text-white font-medium">
                  {userRating.rating} out of 5 stars
                </span>
              </div>

              {userRating.review && (
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-300">{userRating.review}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="border-white/20 text-black hover:bg-white/10"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {userRating.review ? "Edit Review" : "Add Review"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeleteRating}
                  disabled={submitting}
                  className="border-red-500/20 text-red-400 hover:bg-red-500"
                >
                  Delete Rating
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Click to rate:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600 hover:text-yellow-400"
                      }`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => {
                        setRating(star);
                        setShowReviewForm(true);
                      }}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Rate This Event
              </Button>
            </div>
          )}

          {/* Review Form */}
          {showReviewForm && (
            <div className="mt-6 space-y-4 border-t border-white/10 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Rating
                </label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        star <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600 hover:text-yellow-400"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Review (Optional)
                </label>
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience..."
                  className="bg-white/5 border-white/20 text-white placeholder-gray-500"
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-white/20"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-300">
                  Post anonymously
                </label>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSubmitRating}
                  disabled={submitting || rating === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {userRating ? "Update Rating" : "Submit Rating"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                  className="border-white/20 text-black hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Login to Rate</h3>
          <p className="text-gray-400 mb-4">
            You need to be logged in to rate and review this event.
          </p>
          <Button
            onClick={() => window.location.href = "/login"}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Login to Rate
          </Button>
        </div>
      )}
    </div>
  );
}