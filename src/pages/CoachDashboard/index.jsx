"use client"

import { useState } from "react"
import {
  Play,
  MessageCircle,
  Send,
  User,
  Star,
  Calendar,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import AudioUploadButton from "../../components/AudioUploadButton"
import VoiceRecordingButton from "../../components/VoiceRecordingbutton"

const PlayerVideoDashboard = () => {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)
const [uploadedFile, setUploadedFile] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const playerVideos = [
    {
      id: 1,
      playerName: "Marcus Johnson",
      position: "Forward",
      jerseyNumber: 9,
      videoTitle: "vs Arsenal - Match Performance",
      url: "https://videos.stepoutplay.com/videos/1716958601945GulfutdvAlDhafra.mp4",
      duration: "8:30",
      thumbnail: "https://via.placeholder.com/200x120/4f46e5/ffffff?text=Marcus+%239",
      matchDate: "2024-01-15",
      videoType: "Match",
      performance: "Excellent",
      keyMoments: ["Goal 23'", "Assist 67'", "Key Pass 89'"],
      hasReview: false,
    },
    {
      id: 2,
      playerName: "David Rodriguez",
      position: "Midfielder",
      jerseyNumber: 8,
      videoTitle: "Training Session - Passing Drills",
      url: "https://videos.stepoutplay.com/videos/1716958601945GulfutdvAlDhafra.mp4",
      duration: "12:45",
      thumbnail: "https://via.placeholder.com/200x120/7c3aed/ffffff?text=David+%238",
      matchDate: "2024-01-12",
      videoType: "Training",
      performance: "Good",
      keyMoments: ["Long Pass", "Through Ball", "Set Piece"],
      hasReview: true,
    },
    {
      id: 3,
      playerName: "Alex Thompson",
      position: "Defender",
      jerseyNumber: 4,
      videoTitle: "vs Chelsea - Defensive Highlights",
      url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      duration: "6:20",
      thumbnail: "https://via.placeholder.com/200x120/2563eb/ffffff?text=Alex+%234",
      matchDate: "2024-01-10",
      videoType: "Match",
      performance: "Average",
      keyMoments: ["Tackle 15'", "Clearance 34'", "Block 78'"],
      hasReview: false,
    },
    {
      id: 4,
      playerName: "James Wilson",
      position: "Goalkeeper",
      jerseyNumber: 1,
      videoTitle: "Shot Stopping Training",
      url: "https://youtu.be/9RdVS0HtuTI",
      duration: "15:30",
      thumbnail: "https://via.placeholder.com/200x120/059669/ffffff?text=James+%231",
      matchDate: "2024-01-08",
      videoType: "Training",
      performance: "Excellent",
      keyMoments: ["Reflex Save", "Distribution", "Command Area"],
      hasReview: true,
    },
    {
      id: 5,
      playerName: "Ryan Martinez",
      position: "Winger",
      jerseyNumber: 11,
      videoTitle: "vs Liverpool - Wing Play Analysis",
      url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      duration: "9:15",
      thumbnail: "https://via.placeholder.com/200x120/dc2626/ffffff?text=Ryan+%2311",
      matchDate: "2024-01-05",
      videoType: "Match",
      performance: "Good",
      keyMoments: ["Cross 12'", "Dribble 45'", "Sprint 67'"],
      hasReview: false,
    },
  ]

  const handleVideoChange = (index) => {
    setCurrentVideo(index)
    setFeedback("")
    setRating(0)
  }

  const handleFeedbackSubmit = () => {
    if (feedback.trim() && rating > 0) {
      alert(`Feedback for ${playerVideos[currentVideo].playerName}: ${feedback} (Rating: ${rating}/5)`)
      setFeedback("")
      setRating(0)
    }
  }

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case "Excellent":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "Good":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "Average":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "Poor":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getPositionIcon = (position) => {
    switch (position) {
      case "Forward":
        return <TrendingUp className="w-4 h-4" />
      case "Midfielder":
        return <User className="w-4 h-4" />
      case "Defender":
        return <MapPin className="w-4 h-4" />
      case "Goalkeeper":
        return <Award className="w-4 h-4" />
      case "Winger":
        return <Play className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const currentPlayer = playerVideos[currentVideo]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] to-[#11111d] p-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full mb-4 shadow-lg">
            <Play className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Player Performance Review</h1>
          <p className="text-gray-400 text-lg">Analyze player footage and provide detailed feedback</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
          <div className="bg-[#21212e] rounded-xl p-4 shadow-lg border border-gray-800/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Players</p>
                <p className="text-2xl font-bold text-white">{playerVideos.length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#21212e] rounded-xl p-4 shadow-lg border border-gray-800/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Reviewed</p>
                <p className="text-2xl font-bold text-white">{playerVideos.filter((v) => v.hasReview).length}</p>
              </div>
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#21212e] rounded-xl p-4 shadow-lg border border-gray-800/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-white">{playerVideos.filter((v) => !v.hasReview).length}</p>
              </div>
              <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#21212e] rounded-xl p-4 shadow-lg border border-gray-800/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Performance</p>
                <p className="text-2xl font-bold text-white">4.2/5</p>
              </div>
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Main Player Video */}
          <div className="xl:col-span-2 bg-[#21212e] rounded-2xl p-6 shadow-2xl border border-gray-800/50">
            {/* Player Info Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  #{currentPlayer.jerseyNumber}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentPlayer.playerName}</h2>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      {getPositionIcon(currentPlayer.position)}
                      <span className="text-purple-400 font-medium">{currentPlayer.position}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPerformanceColor(currentPlayer.performance)}`}
                    >
                      {currentPlayer.performance}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{new Date(currentPlayer.matchDate).toLocaleDateString()}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    currentPlayer.videoType === "Match" ? "bg-red-400/10 text-red-400" : "bg-blue-400/10 text-blue-400"
                  }`}
                >
                  {currentPlayer.videoType}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-300 mb-4">{currentPlayer.videoTitle}</h3>

            {/* Video Player */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-6 relative group">
              <video
                key={currentPlayer.id}
                className="w-full h-full object-cover"
                controls
                autoPlay
                src={currentPlayer.url}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Key Moments */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Key Moments</h4>
              <div className="flex flex-wrap gap-2">
                {currentPlayer.keyMoments.map((moment, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-600/30"
                  >
                    {moment}
                  </span>
                ))}
              </div>
            </div>

            {/* Video Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Duration: {currentPlayer.duration}</span>
                </div>
                <span className="text-sm">
                  Player {currentVideo + 1} of {playerVideos.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleVideoChange(Math.max(0, currentVideo - 1))}
                  disabled={currentVideo === 0}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                <button
                  onClick={() => handleVideoChange(Math.min(playerVideos.length - 1, currentVideo + 1))}
                  disabled={currentVideo === playerVideos.length - 1}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Player List Sidebar */}
          <div className="bg-[#21212e] rounded-2xl p-6 shadow-2xl border border-gray-800/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <User className="mr-3 text-purple-400" size={20} />
              Player Videos
            </h3>
            <div className="space-y-4 max-h-[700px] overflow-y-auto custom-scrollbar">
              {playerVideos.map((player, index) => (
                <div
                  key={player.id}
                  onClick={() => handleVideoChange(index)}
                  className={`cursor-pointer p-5 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border ${
                    currentVideo === index
                      ? "bg-gradient-to-r from-purple-600/20 to-purple-500/20 border-purple-400/50 shadow-lg shadow-purple-500/20"
                      : "bg-[#1a1a26] hover:bg-[#2a2a3e] border-gray-800/50 hover:border-gray-700/50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={player.thumbnail || "/placeholder.svg"}
                        alt={player.playerName}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {player.jerseyNumber}
                      </div>
                      {player.hasReview && (
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-medium text-sm leading-tight mb-1 ${
                          currentVideo === index ? "text-purple-300" : "text-gray-200"
                        }`}
                      >
                        {player.playerName}
                      </h4>
                      <div className="flex items-center space-x-2 mb-2">
                        {getPositionIcon(player.position)}
                        <span className="text-xs text-gray-400">{player.position}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPerformanceColor(player.performance)}`}
                        >
                          {player.performance}
                        </span>
                        <span className="text-xs text-gray-400">{player.duration}</span>
                      </div>
                    </div>
                    {currentVideo === index && (
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coach Feedback Section */}
        <div className="bg-[#21212e] rounded-2xl p-6 shadow-2xl border border-gray-800/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <MessageCircle className="mr-3 text-purple-400" size={20} />
            Coach Feedback for {currentPlayer.playerName}
          </h3>
          <div className="space-y-6">
            {/* Rating System */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Performance Rating</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 rounded-full transition-colors duration-200 ${
                      star <= rating ? "text-yellow-400 hover:text-yellow-300" : "text-gray-600 hover:text-gray-500"
                    }`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
                <span className="ml-3 text-gray-400">{rating > 0 ? `${rating}/5` : "No rating"}</span>
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Detailed Feedback & Recommendations
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={`Provide detailed feedback for ${currentPlayer.playerName}'s performance. Include strengths, areas for improvement, tactical observations, and specific recommendations...`}
                className="w-full p-4 bg-[#1a1a26] border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 resize-none transition-all duration-200 text-white placeholder-gray-500 shadow-inner"
                rows="5"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {currentPlayer.hasReview ? (
                  <span className="flex items-center text-green-400">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    This player has been reviewed
                  </span>
                ) : (
                  <span className="flex items-center text-orange-400">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Pending review
                  </span>
                )}
              </div>
             <AudioUploadButton
            onFileSelect={setUploadedFile}
            selectedFile={uploadedFile}
            onRemoveFile={() => setUploadedFile(null)}
          />

          <VoiceRecordingButton
            onRecordingComplete={setRecordedBlob}
            recordedBlob={recordedBlob}
            onDeleteRecording={() => setRecordedBlob(null)}
          />
              <button
                onClick={handleFeedbackSubmit}
                disabled={!feedback.trim() || rating === 0}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#21212e] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send size={16} />
                <span>Submit Feedback</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a26;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4c4c6d;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6366f1;
        }
      `}</style>
    </div>
  )
}

export default PlayerVideoDashboard
