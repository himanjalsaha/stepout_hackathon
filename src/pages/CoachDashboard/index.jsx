
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
  Upload,
  Mic,
  MicOff,
  Trash2,
  Loader2,
  CheckCircle,
  X,
  Edit3,
  Eye,
  Copy,
} from "lucide-react"

const PlayerVideoDashboard = () => {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [recordedBlob, setRecordedBlob] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)

  // Modal states
  const [showAIFeedbackModal, setShowAIFeedbackModal] = useState(false)
  const [editableAIFeedback, setEditableAIFeedback] = useState("")
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false) // Changed to false so it opens in edit mode
  const [messageId, setMessageId] = useState(null)

  const MAIN_URL = "http://13.233.199.154:8000/api/upload_audio_or_text/"
  const SEND_FEEDBACK_URL = "http://13.233.199.154:8000/api/save_message/"

  // Mock AI feedback for testing
  const mockAIFeedback = `# Match Feedback Report: StepOut FC vs Dynamo United (3-2 Win)

## Team Performance Overview
• **Excellent result** - Controlled possession (52%) and clinical finishing secured victory
• **Strong attacking display** - 7 shots on target converted efficiently into 3 goals
• **Disciplined performance** - Only 8 fouls committed vs opponent's 10

## Individual Player Highlights
• **Arjun (MOTM)** - Outstanding with 2 goals, 1 assist, and 88% pass accuracy
• **Rahul** - Crucial goal contribution but needs better discipline (yellow card at 60')
• **Sameer** - Defensive rock with 5 tackles won and 3 interceptions
• **Vikram** - Solid goalkeeping with 3 crucial saves
• **Opposition threat**: Alex and Ben caused problems - study their movement patterns

## Analysis of Coach's Focus Areas
• **Defensive organization** ✓ - Sameer led well, but conceded 2 goals needs addressing
• **Transition play** ✓ - Quick counter-attacks led to 78th-minute winner
• **Scoring opportunities** ✓ - Clinical 43% conversion rate (3/7 shots on target)

## Tactical Recommendations
• **Improve defensive transitions** - Tighten marking during opponent's counter-attacks
• **Maintain possession discipline** - Build on excellent 84% pass accuracy
• **Rahul**: Channel aggression positively to avoid bookings
• **Continue pressing game** - 15 tackles won disrupted opponent's rhythm effectively`

  const playerVideos = [
    {
      id: 1,
      playerName: "Marcus Johnson",
      position: "Forward",
      jerseyNumber: 9,
      videoTitle: "vs Arsenal - Match Performance",
      url: "https://match-videos.s3.ap-south-1.amazonaws.com/BEST+FOOTBALL+HIGHLIGHTS+!+DC+CHANDIL+1-1+HULHUNDU+FC+!+JHARKHAND+FOOTBALL+TOURNAMENT+2025.mp4",
      duration: "8:30",
      thumbnail: "https://img.a.transfermarkt.technology/portrait/header/157113-1701772034.png?lm=1",
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
      thumbnail: "https://img.a.transfermarkt.technology/portrait/header/739447-1663852638.jpg?lm=1",
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
      url: "https://videos.stepoutplay.com/videos/1716958601945GulfutdvAlDhafra.mp4",
      duration: "6:20",
      thumbnail: "https://img.a.transfermarkt.technology/portrait/header/291247-1581332100.png?lm=1",
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
      duration: "15:30",
      url: "https://videos.stepoutplay.com/videos/1716958601945GulfutdvAlDhafra.mp4",
      thumbnail: "https://administrator.the-aiff.com/players_docs/105595-Photograph-1667508413.png",
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
      url: "https://videos.stepoutplay.com/videos/1716958601945GulfutdvAlDhafra.mp4",
      duration: "9:15",
      thumbnail: "https://img.a.transfermarkt.technology/portrait/header/629597-1649403219.jpg?lm=1",
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
    setUploadedFile(null)
    setRecordedBlob(null)
    setApiResponse(null)
    setShowAIFeedbackModal(false)
  }

  // Test function to show modal with mock data
  const showTestModal = () => {
    console.log("Showing test modal...")
    setEditableAIFeedback(mockAIFeedback)
    setApiResponse({
      success: true,
      message_id: 9,
      detected_language: "en",
      ai_feedback: mockAIFeedback,
    })
    setMessageId(9)
    setShowAIFeedbackModal(true)
    setIsPreviewMode(false) // Start in edit mode
  }

  // Audio Upload Component
  const AudioUploadButton = ({ onFileSelect, selectedFile, onRemoveFile }) => {
    const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file && file.type.startsWith("audio/")) {
        onFileSelect(file)
      } else {
        alert("Please select a valid audio file")
      }
    }

    return (
      <div className="flex items-center space-x-2">
        {!selectedFile ? (
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Upload size={16} />
            <span>Upload Audio</span>
            <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
          </label>
        ) : (
          <div className="flex items-center space-x-2 bg-green-600/20 text-green-300 px-3 py-2 rounded-lg border border-green-600/30">
            <CheckCircle size={16} />
            <span className="text-sm">{selectedFile.name}</span>
            <button onClick={onRemoveFile} className="text-red-400 hover:text-red-300 ml-2">
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    )
  }

  // Voice Recording Component
  const VoiceRecordingButton = ({ onRecordingComplete, recordedBlob, onDeleteRecording }) => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        const chunks = []

        recorder.ondataavailable = (e) => chunks.push(e.data)
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/mp3" })
          onRecordingComplete(blob)
          stream.getTracks().forEach((track) => track.stop())
        }

        recorder.start()
        setMediaRecorder(recorder)
        setIsRecording(true)
      } catch (error) {
        console.error("Error accessing microphone:", error)
        alert("Could not access microphone. Please check permissions.")
      }
    }

    const stopRecording = () => {
      if (mediaRecorder && isRecording) {
        mediaRecorder.stop()
        setIsRecording(false)
        setMediaRecorder(null)
      }
    }

    return (
      <div className="flex items-center space-x-2">
        {!recordedBlob ? (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              isRecording
                ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
            <span>{isRecording ? "Stop Recording" : "Record Audio"}</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 bg-green-600/20 text-green-300 px-3 py-2 rounded-lg border border-green-600/30">
            <CheckCircle size={16} />
            <span className="text-sm">Recording Ready</span>
            <button onClick={onDeleteRecording} className="text-red-400 hover:text-red-300 ml-2">
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    )
  }

  // API Integration Function
  const submitToAPI = async (textData, audioFile = null) => {
    setIsSubmitting(true)
    setApiResponse(null)

    try {
      const formData = new FormData()
      if (audioFile) {
        const audioFileToSend =
          audioFile instanceof Blob ? new File([audioFile], "recording.mp3", { type: "audio/mp3" }) : audioFile
        formData.append("audio", audioFileToSend)
        formData.append("uploaded_by", "coach")
      } else {
        formData.append("text", textData)
        formData.append("uploaded_by", "coach")
      }

      const response = await fetch(MAIN_URL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("API Response:", result)
      setApiResponse(result)

      // Check if we got AI feedback and show modal
      if (result.success && result.ai_feedback) {
        console.log("AI Feedback received, showing modal...")
        setEditableAIFeedback(result.ai_feedback)
        setMessageId(result.message_id || Date.now())
        setShowAIFeedbackModal(true)
        setIsPreviewMode(false) // Start in edit mode
      }

      // If we got a translation, update the feedback with it
      if (result.translated_text) {
        setFeedback(result.translated_text)
      }

      return result
    } catch (error) {
      console.error("API Error:", error)
      setApiResponse({
        success: false,
        error: error.message || "Failed to process request",
      })
      return null
    } finally {
      setIsSubmitting(false)
    }
  }

  // Send AI Feedback to different API
  const sendAIFeedback = async () => {
    setIsSendingFeedback(true)

    try {
      const response = await fetch(SEND_FEEDBACK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message_id: messageId,
          final_message: editableAIFeedback,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Send Feedback Response:", result)

      alert(`Feedback sent successfully for ${currentPlayer.playerName}!`)
      setShowAIFeedbackModal(false)

      // Reset form
      setFeedback("")
      setRating(0)
      setUploadedFile(null)
      setRecordedBlob(null)
      setApiResponse(null)
    } catch (error) {
      console.error("Send Feedback Error:", error)
      alert("Failed to send feedback. Please try again.")
    } finally {
      setIsSendingFeedback(false)
    }
  }

  // AI Feedback Modal Component
  const AIFeedbackModal = () => {
    console.log("Modal render - showAIFeedbackModal:", showAIFeedbackModal, "isPreviewMode:", isPreviewMode)

    if (!showAIFeedbackModal) return null

    const copyToClipboard = () => {
      navigator.clipboard.writeText(editableAIFeedback)
      alert("Feedback copied to clipboard!")
    }

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div className="bg-[#21212e] rounded-2xl shadow-2xl border border-gray-800/50 w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AI Generated Feedback</h3>
                <p className="text-gray-400 text-sm">For {currentPlayer.playerName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Mode Toggle Buttons */}
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setIsPreviewMode(false)}
                  className={`px-3 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 ${
                    !isPreviewMode
                      ? "bg-purple-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Edit3 size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className={`px-3 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 ${
                    isPreviewMode
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Eye size={16} />
                  <span>Preview</span>
                </button>
              </div>
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <Copy size={16} />
                <span>Copy</span>
              </button>
              <button
                onClick={() => setShowAIFeedbackModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {isPreviewMode ? (
              <div className="prose prose-invert max-w-none">
                <div
                  className="text-gray-300 whitespace-pre-wrap leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: editableAIFeedback
                      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-white mb-4">$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold text-purple-300 mb-3 mt-6">$1</h2>')
                      .replace(
                        /^• \*\*(.*?)\*\* - (.*$)/gm,
                        '<div class="mb-2"><span class="font-semibold text-blue-300">• $1</span> - $2</div>',
                      )
                      .replace(/^• (.*$)/gm, '<div class="mb-1 text-gray-300">• $1</div>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>'),
                  }}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">Edit AI Feedback</h4>
                  <span className="text-sm text-gray-400">{editableAIFeedback.length} characters</span>
                </div>
                <textarea
                  value={editableAIFeedback}
                  onChange={(e) => setEditableAIFeedback(e.target.value)}
                  className="w-full h-96 p-4 bg-[#1a1a26] border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 resize-none transition-all duration-200 text-white placeholder-gray-500 font-mono text-sm leading-relaxed"
                  placeholder="Edit the AI generated feedback..."
                  autoFocus
                />
                <p className="text-sm text-gray-400">
                  💡 Tip: Use Markdown formatting (# for headers, ** for bold, • for bullets)
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-800/50 bg-[#1a1a26]">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">{messageId && <span>Message ID: {messageId}</span>}</div>
              {apiResponse?.detected_language && (
                <div className="text-sm text-gray-400">Language: {apiResponse.detected_language}</div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAIFeedbackModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendAIFeedback}
                disabled={isSendingFeedback || !editableAIFeedback.trim()}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingFeedback ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Feedback</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim() && !uploadedFile && !recordedBlob) {
      alert("Please provide feedback text or upload/record audio")
      return
    }

    if (rating === 0) {
      alert("Please provide a rating")
      return
    }

    // Submit to API first
    let apiResult = null
    if (uploadedFile || recordedBlob) {
      apiResult = await submitToAPI("", uploadedFile || recordedBlob)
    } else if (feedback.trim()) {
      apiResult = await submitToAPI(feedback.trim())
    }

    // If no AI feedback was generated, show success message
    if (apiResult && apiResult.success && !apiResult.ai_feedback) {
      alert(
        `Feedback submitted successfully for ${currentPlayer.playerName}!\n` +
          `Rating: ${rating}/5\n` +
          `Message ID: ${apiResult.message_id}\n` +
          `${apiResult.detected_language ? `Detected Language: ${apiResult.detected_language}` : ""}\n` +
          `${apiResult.translated_text ? `Translated: ${apiResult.translated_text}` : ""}`,
      )

      // Reset form
      setFeedback("")
      setRating(0)
      setUploadedFile(null)
      setRecordedBlob(null)
      setApiResponse(null)
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
                        className="w-16 h-16 object-cover rounded-lg"
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

            {/* Audio/Text Input Options */}
            <div className="bg-[#1a1a26] rounded-xl p-4 border border-gray-700/50">
              <h4 className="text-white font-medium mb-4">Feedback Input Options</h4>
              <div className="flex flex-wrap gap-4 mb-4">
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
              </div>
              <p className="text-sm text-gray-400">
                Choose to type your feedback, upload an audio file, or record your voice directly. Audio will be
                processed and can be translated if needed.
              </p>
            </div>

            {/* API Response Display */}
            {apiResponse && !showAIFeedbackModal && (
              <div
                className={`p-4 rounded-xl border ${
                  apiResponse.success
                    ? "bg-green-900/20 border-green-500/30 text-green-300"
                    : "bg-red-900/20 border-red-500/30 text-red-300"
                }`}
              >
                {apiResponse.success ? (
                  <div>
                    <p className="font-medium mb-2">✓ Audio processed successfully!</p>
                    <p className="text-sm">Message ID: {apiResponse.message_id}</p>
                    {apiResponse.detected_language && (
                      <p className="text-sm">Detected Language: {apiResponse.detected_language}</p>
                    )}
                    {apiResponse.translated_text && (
                      <p className="text-sm">Translated: {apiResponse.translated_text}</p>
                    )}
                  </div>
                ) : (
                  <p>✗ Error: {apiResponse.error}</p>
                )}
              </div>
            )}

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
                disabled={uploadedFile || recordedBlob}
              />
              {(uploadedFile || recordedBlob) && (
                <p className="text-sm text-gray-400 mt-2">
                  Text input disabled while audio is selected. Remove audio to type manually.
                </p>
              )}
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
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={(!feedback.trim() && !uploadedFile && !recordedBlob) || rating === 0 || isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#21212e] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Feedback Modal */}
      <AIFeedbackModal />

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
