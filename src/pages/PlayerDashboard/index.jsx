import React, { useEffect, useState } from 'react';
import { MessageCircle, Languages, Download, Share2, Filter } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import FeedbackList from './FeedbackList';

const PlayerDashboard = () => {
  const [matchData, setMatchData] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [feedback,setFeedback] = useState([])

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'pt', label: 'Portuguese' }
  ];

  useEffect(() => {
    const fetchMatchData = async () => {
      setLoading(true);
      const dummyData = {
        title: 'Match Analysis: Stepout FC vs Rivals United',
        url: 'https://videos.stepoutplay.com/videos/1716958601945GulfutdvAlDhafra.mp4',
        duration: '90:00',
        playerProfile: {
          name: 'Rohan Kumar',
          age: 16,
          position: 'Left Winger',
          avatar: 'https://administrator.the-aiff.com/players_docs/58314-Photo-1643121114.jpg',
          team: 'Stepout FC U17'
        },
        matchDetails: {
          date: 'July 10, 2025',
          teamA: 'Stepout FC',
          teamB: 'Rivals United',
          scoreA: 3,
          scoreB: 2,
          goals: [
            { minute: 12, player: 'John Doe', team: 'Stepout FC' },
            { minute: 27, player: 'Carlos Vega', team: 'Rivals United' },
            { minute: 45, player: 'Liam Singh', team: 'Stepout FC' },
            { minute: 58, player: 'Alex Ruiz', team: 'Rivals United' },
            { minute: 89, player: 'Zaid Khan', team: 'Stepout FC' }
          ]
        },
        
      };

       const feedback0= [
          {
            id: 1,
            text:'Hola, coma elhgas',
            original_language:'es',
            translated_to_en:'Hellow, How are you?',
            audio_url:null,
            uploaded_by:'Anon',
            created_at:'2025-7-11T04:34:59.8400Z'
          },
        
        ]

      const feedback1= [
          {
            id: 1,
            translations: {
              en: {
                text: 'Great positioning during the 2nd goal build-up.',
                audio: '/audios/1_en.mp3'
              },
              es: {
                text: 'Buena posición durante la construcción del segundo gol.',
                audio: '/audios/1_es.mp3'
              }
            }
          },
          {
            id: 2,
            translations: {
              en: {
                text: 'Needs quicker reaction to defensive transitions.',
                audio: '/audios/2_en.mp3'
              },
              fr: {
                text: 'Besoin de réactions plus rapides en défense.',
                audio: '/audios/2_fr.mp3'
              }
            }
          }
        ]

      try {
        const response = await fetch('https://afae56099e65.ngrok-free.app/messages');
        if (response.ok) throw new Error('API error');
        const data = await response.json();
        // setMatchData(data);
        // setSelectedLanguages(data.feedback.map(() => 'en'));
        console.log(data,"CHECK DATA")
      } catch (error) {
        console.warn('Using dummy data due to error:', error);
        setMatchData(dummyData);
        setSelectedLanguages(feedback1.map(() => 'en'));
        setFeedback(feedback1)
      }

      setLoading(false);
    };

    fetchMatchData();
  }, []);

  const handleLanguageChange = (index, lang) => {
    const updated = [...selectedLanguages];
    updated[index] = lang;
    setSelectedLanguages(updated);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Stepout Match Feedback',
        text: 'Check out this match feedback report!',
        url: window.location.href
      });
    } else {
      alert('Sharing not supported on this device');
    }
  };

  const handleDownload = () => {
    alert('Download PDF functionality coming soon!');
    // Hook this to backend-generated PDF if needed
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading match data...</div>;
  }

  const { title, url, duration, matchDetails, playerProfile } = matchData;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">🎯 Player Match Feedback</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-xl text-sm font-medium"
            >
              <Download size={16} />
              Download PDF
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl text-sm font-medium"
            >
              <Share2 size={16} />
              Share Match
            </button>
            <div className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-sm">
              <Filter size={14} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none"
              >
                <option value="all">All Goals</option>
                {/* Add more filters like: <option value="teamA">Stepout FC Goals</option> */}
              </select>
            </div>
          </div>
        </div>

        {/* Profile + Match Details */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Player Profile */}
          <div className="md:w-1/2 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-md">
            <img
              src={playerProfile.avatar}
              alt="Player Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold">{playerProfile.name}</h2>
              <p className="text-sm text-gray-400 mt-1">{playerProfile.team}</p>
              <p className="text-sm text-gray-400 mt-1">
                Age: {playerProfile.age} | Position: {playerProfile.position}
              </p>
            </div>
          </div>

          {/* Match Details */}
          <div className="md:w-1/2 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {matchDetails.teamA} <span className="text-purple-400">vs</span> {matchDetails.teamB}
                </h2>
                <p className="text-sm text-gray-400">Played on {matchDetails.date}</p>
              </div>
              <div className="text-3xl font-bold text-green-400">
                {matchDetails.scoreA} - {matchDetails.scoreB}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">⚽ Goals Timeline</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                {matchDetails.goals.map((goal, idx) => (
                  <li key={idx}>
                    ⏱️ {goal.minute}' - <strong>{goal.player}</strong> ({goal.team})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Video + Feedback */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Video */}
          <div className="md:w-2/3 bg-[#161b22] rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <VideoPlayer url={url} />
            </div>
            <div className="text-right text-sm text-gray-400 mt-2">
              Full Time: {duration}
            </div>
          </div>

          {/* Feedback */}
          {/* <div className="md:w-1/3 bg-[#161b22] rounded-2xl p-6 shadow-md h-[75vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <MessageCircle className="mr-2 text-purple-400" size={20} />
              Coach Feedback
            </h3> */}

            {/* {feedback.length ? (
              <div className="space-y-6">
                {feedback.map((item, idx) => {
                  const selectedLang = selectedLanguages[idx];
                  const data = item.translations[selectedLang];

                  return (
                    <div
                      key={item.id}
                      className="bg-[#0d1117] border border-gray-700 p-4 rounded-xl transition duration-300 hover:border-purple-400"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">Feedback #{idx + 1}</span>
                        <div className="flex items-center space-x-2">
                          <Languages size={16} />
                          <select
                            value={selectedLang}
                            onChange={(e) => handleLanguageChange(idx, e.target.value)}
                            className="bg-[#161b22] border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none"
                          >
                            {languages.map((lang) => (
                              <option key={lang.code} value={lang.code}>
                                {lang.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {data?.text && <p className="text-sm mb-2 text-gray-200">{data.text}</p>}
                      {data?.audio && (
                        <audio controls src={data.audio} className="w-full">
                          Your browser does not support the audio element.
                        </audio>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No feedback available.</p>
            )} */}
            <FeedbackList
  feedback={feedback}
  languages={languages}
/>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
