import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Send, ShieldCheck, User, MessageSquare } from 'lucide-react';
import { Listing, Review, Language } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
  language: Language;
  onAddReview: (listingId: string, review: Review) => void;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose, listing, language, onAddReview }) => {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `rev_${Date.now()}`,
      author: author.trim(),
      rating: rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    onAddReview(listing.id, newReview);
    
    // Reset Form
    setAuthor('');
    setComment('');
    setRating(5);
  };

  const isHindi = language === 'HI';

  // Summarize review counts
  const reviews = listing.reviews || [];
  const starCounts = [0, 0, 0, 0, 0];
  reviews.forEach(r => {
    const starIndex = Math.max(0, Math.min(4, Math.floor(r.rating) - 1));
    starCounts[starIndex]++;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 z-[110] flex items-center justify-center p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col"
        >
          {/* Header */}
          <div className="bg-orange-600 p-8 text-white relative overflow-hidden flex justify-between items-center flex-shrink-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10">
              <span className="bg-white/20 text-white text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full inline-block mb-2 border border-white/10">
                {isHindi ? 'किरायेदार फीडबैक' : 'Tenant Feedback'}
              </span>
              <h3 className="text-3xl font-black mb-1 tracking-tight">
                {isHindi ? 'कमरे की रेटिंग & समीक्षाएं' : 'Room Ratings & Reviews'}
              </h3>
              <p className="text-orange-100 text-xs font-bold leading-none">
                {listing.locality} • {listing.address}
              </p>
            </div>
            <button
              onClick={onClose}
              className="relative z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="overflow-y-auto p-8 flex-1 space-y-8 scrollbar-hide">
            {/* Grid for Ratings distribution and average score */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center bg-slate-50 dark:bg-slate-950/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
              <div className="text-center md:col-span-2">
                <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none block mb-1">
                  {listing.rating || 'N/A'}
                </span>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={star <= Math.round(listing.rating || 0) ? '#ea580c' : 'none'}
                      className={star <= Math.round(listing.rating || 0) ? 'text-orange-600' : 'text-slate-350 dark:text-slate-700'}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest leading-none">
                  {reviews.length} {isHindi ? 'समीक्षाएं' : 'Total Reviews'}
                </p>
              </div>

              {/* Progress bars */}
              <div className="md:col-span-3 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = starCounts[stars - 1];
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-bold w-3 text-right">{stars}</span>
                      <Star size={12} fill="#ea580c" className="text-orange-600 flex-shrink-0" />
                      <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-orange-600 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-bold w-6">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Existing Review Feed */}
            <div className="space-y-4">
              <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <MessageSquare size={18} className="text-orange-600" />
                {isHindi ? 'किरायेदारों के अनुभव' : 'Tenant Experiences'}
              </h4>
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl border border-slate-50 dark:border-slate-850">
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wide">
                      {isHindi ? 'अभी कोई समीक्षा नहीं है' : 'No reviews yet for this room'}
                    </p>
                  </div>
                ) : (
                  reviews.map((rev) => (
                    <div 
                      key={rev.id} 
                      className="p-5 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-100 dark:border-slate-850 flex items-start gap-4"
                    >
                      <div className="bg-orange-100 dark:bg-orange-950/50 p-3 rounded-full text-orange-600 dark:text-orange-400">
                        <User size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 flex-wrap mb-1">
                          <h5 className="font-extrabold text-sm text-slate-900 dark:text-white leading-none">{rev.author}</h5>
                          <span className="text-[10px] text-slate-400 font-bold">{rev.date}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={12}
                              fill={star <= rev.rating ? '#ea580c' : 'none'}
                              className={star <= rev.rating ? 'text-orange-600' : 'text-slate-200 dark:text-slate-800'}
                            />
                          ))}
                        </div>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
                          {rev.comment}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Add Review form */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-8">
              <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-4 uppercase text-xs tracking-widest">
                {isHindi ? 'अपनी समीक्षा जोड़ें' : 'Add Your Review'}
              </h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                    {isHindi ? 'आपका स्कोर:' : 'Your Rating:'}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 cursor-pointer transition-all hover:scale-125 hover:text-orange-600"
                      >
                        <Star
                          size={24}
                          fill={star <= (hoverRating !== null ? hoverRating : rating) ? '#ea580c' : 'none'}
                          className={star <= (hoverRating !== null ? hoverRating : rating) ? 'text-orange-600' : 'text-slate-300 dark:text-slate-700'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                      {isHindi ? 'आपका नाम' : 'Your Name'}
                    </label>
                    <input
                      required
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder={isHindi ? 'जैसे: राहुल पटेल' : 'e.g. John Doe'}
                      className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:border-orange-600 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                    {isHindi ? 'आपकी टिप्पणी / अनुभव' : 'Your Review / Experience'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={isHindi ? 'कमरे की स्थिति, पानी की सुविधा, मकान मालिक का व्यवहार बताएं...' : 'Describe facilities, environment, owner behavior...'}
                    className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:border-orange-600 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-slate-900 dark:bg-slate-800 text-white font-black text-sm px-6 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-600 hover:text-white transition-all shadow-lg shadow-slate-100 dark:shadow-none w-full sm:w-auto cursor-pointer"
                >
                  <Send size={16} />
                  {isHindi ? 'समीक्षा सबमिट करें' : 'Post Review'}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReviewsModal;
