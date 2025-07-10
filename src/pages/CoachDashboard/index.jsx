import React, { useState } from 'react';
import { Play, MessageCircle, Send } from 'lucide-react';

const VideoDashboard = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [feedback, setFeedback] = useState('');

  const videos = [
    {
      id: 1,
      title: "Introduction to Web Development",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: "5:30",
      thumbnail: "https://via.placeholder.com/150x100/4f46e5/ffffff?text=Video+1"
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
          url: "https://www.w3schools.com/html/mov_bbb.mp4",

      duration: "8:45",
      thumbnail: "https://via.placeholder.com/150x100/7c3aed/ffffff?text=Video+2"
    },
    {
      id: 3,
      title: "React Fundamentals",
      url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      duration: "12:20",
      thumbnail: "https://via.placeholder.com/150x100/2563eb/ffffff?text=Video+3"
    },
    {
      id: 4,
      title: "CSS Grid & Flexbox",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: "6:15",
      thumbnail: "https://via.placeholder.com/150x100/059669/ffffff?text=Video+4"
    },
    {
      id: 5,
      title: "Node.js Backend Development",
      url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      duration: "15:30",
      thumbnail: "https://via.placeholder.com/150x100/dc2626/ffffff?text=Video+5"
    }
  ];

  const handleVideoChange = (index) => {
    setCurrentVideo(index);
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      alert(`Feedback submitted: ${feedback}`);
      setFeedback('');
    }
  };

  return (
    <div className="min-h-screen bg-[#11111d] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Coach dashboard</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Player */}
          <div className="lg:col-span-2 bg-[#21212e] rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {videos[currentVideo].title}
            </h2>
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-4">
              <video 
                key={videos[currentVideo].id}
                className="w-full h-full object-cover"
                controls
                autoPlay
                src={videos[currentVideo].url}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-sm">Duration: {videos[currentVideo].duration}</span>
              <span className="text-sm">Video {currentVideo + 1} of {videos.length}</span>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="bg-[#21212e] rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Play className="mr-2 text-purple-400" size={20} />
              Playlist
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoChange(index)}
                  className={`cursor-pointer p-3 rounded-lg transition-all duration-300 hover:shadow-md ${
                    currentVideo === index
                      ? 'bg-purple-600/20 border-2 border-purple-400'
                      : 'bg-[#11111d] hover:bg-[#2a2a3e]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-12 h-8 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-sm leading-tight ${
                        currentVideo === index ? 'text-purple-300' : 'text-gray-200'
                      }`}>
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">{video.duration}</p>
                    </div>
                    {currentVideo === index && (
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-[#21212e] rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <MessageCircle className="mr-2 text-purple-400" size={20} />
            Share Your Feedback
          </h3>
          <div className="space-y-4">
            <div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think about this video or suggest improvements..."
                className="w-full p-4 bg-[#11111d] border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-400 resize-none transition-all duration-200 text-white placeholder-gray-400"
                rows="4"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleFeedbackSubmit}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Send size={16} />
                <span>Submit Feedback</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDashboard;