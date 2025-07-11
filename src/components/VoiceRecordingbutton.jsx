// Voice Recording Button Component

import React, { useState, useRef } from 'react';
import { Upload, Mic, Square, Play, Pause, Trash2 } from 'lucide-react';

const VoiceRecordingButton = ({ onRecordingComplete, recordedBlob, onDeleteRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        if (onRecordingComplete) {
          onRecordingComplete(blob);
        }
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
    }
  };

  const playRecording = () => {
    if (recordedBlob && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = URL.createObjectURL(recordedBlob);
        audioRef.current.play();
        setIsPlaying(true);
        
        audioRef.current.onended = () => {
          setIsPlaying(false);
        };
      }
    }
  };

  const deleteRecording = () => {
    if (onDeleteRecording) {
      onDeleteRecording();
    }
    setIsPlaying(false);
    setRecordingTime(0);
    if (audioRef.current) {
      audioRef.current.src = '';
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-4">
      {!isRecording ? (
        <button
          onClick={startRecording}
          disabled={!!recordedBlob}
          className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#21212e] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Mic size={16} />
          <span>Record Voice</span>
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="bg-gradient-to-r from-gray-600 to-gray-500 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-gray-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#21212e]"
        >
          <Square size={16} />
          <span>Stop Recording</span>
        </button>
      )}
      
      {isRecording && (
        <div className="flex items-center space-x-2 text-red-400">
          <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-mono">{formatTime(recordingTime)}</span>
        </div>
      )}
      
      {recordedBlob && (
        <div className="flex items-center space-x-2 bg-[#1a1a2e] px-3 py-2 rounded-lg border border-gray-600">
          <button
            onClick={playRecording}
            className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={deleteRecording}
            className="text-red-400 hover:text-red-300 px-2"
          >
            <Trash2 size={16} />
          </button>
          <span className="text-white text-sm">Ready</span>
        </div>
      )}
      
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};


export default VoiceRecordingButton;