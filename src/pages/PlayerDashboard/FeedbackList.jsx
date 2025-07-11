import React from 'react';
import FeedbackItem from './FeedbackItem';
import { MessageCircle } from 'lucide-react';

const FeedbackList = ({ feedback, languages }) => {
  return (
    <div className="bg-[#161b22] w-full rounded-2xl p-6 shadow-md h-[75vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <MessageCircle className="mr-2 text-purple-400" size={20} />
        Coach Feedback
      </h3>

      {feedback.length ? (
        <div className="space-y-6">
          {feedback.map((item, idx) => (
            <FeedbackItem listData={item} key={item.id} item={item} index={idx} languages={languages} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No feedback available.</p>
      )}
    </div>
  );
};

export default FeedbackList;
