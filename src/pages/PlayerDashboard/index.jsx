import React, { useEffect, useState } from 'react';
import { MessageCircle, Languages } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';

const PlayerDashboard = () => {
  const [matchData, setMatchData] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'pt', label: 'Portuguese' }
  ];

  useEffect(() => {
    const fetchMatchData = async () => {
      setLoading(true);

      // Simulate API call with dummy data
      setTimeout(() => {
        const dummyData = {
          title: 'Match Analysis: Stepout FC vs Rivals United',
          url: 'https://videos.stepoutplay.com/videos/1716958601945GulfutdvAlDhafra.mp4',
          duration: '90:00',
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
          feedback: [
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
        };

        setMatchData(dummyData);
        setSelectedLanguages(dummyData.feedback.map(() => 'en'));
        setLoading(false);
      }, 1000); // Simulate 1s network delay
    };

    fetchMatchData();
  }, []);

  const handleLanguageChange = (index, lang) => {
    const updated = [...selectedLanguages];
    updated[index] = lang;
    setSelectedLanguages(updated);
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading match data...</div>;
  }

  const { title, url, duration, matchDetails, feedback } = matchData;

  return (
    <div className="min-h-screen bg-[#0d1117] p-4 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          ⚽ Match Feedback Report
        </h1>

        {/* Match Details */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                {matchDetails.teamA} <span className="text-purple-400">vs</span> {matchDetails.teamB}
              </h2>
              <p className="text-sm text-gray-400">Played on {matchDetails.date}</p>
            </div>
            <div className="text-3xl font-bold">
              {matchDetails.scoreA} - {matchDetails.scoreB}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-2">Goals</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              {matchDetails.goals.map((goal, idx) => (
                <li key={idx}>
                  ⏱️ {goal.minute}' - {goal.player} ({goal.team})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Video + Feedback */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Video Section */}
          <div className="md:w-2/3 w-full bg-[#161b22] rounded-2xl p-4 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <VideoPlayer
                url={url}
              />
               
            </div>
            <div className="text-right text-sm text-gray-400 mt-2">
              Full Time: {duration}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="md:w-1/3 w-full bg-[#161b22] rounded-2xl p-4 shadow-lg h-[75vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <MessageCircle className="mr-2 text-purple-400" size={20} />
              Coach Feedback
            </h3>

            {feedback.length ? (
              <div className="space-y-4">
                {feedback.map((item, idx) => {
                  const selectedLang = selectedLanguages[idx];
                  const data = item.translations[selectedLang];

                  return (
                    <div key={item.id} className="bg-[#0d1117] border border-gray-700 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm font-medium">Feedback {idx + 1}</span>
                        <div className="flex items-center space-x-2 text-white">
                          <Languages size={16} />
                          <select
                            value={selectedLang}
                            onChange={(e) => handleLanguageChange(idx, e.target.value)}
                            className="bg-[#161b22] border border-gray-700 text-white px-2 py-1 rounded text-sm"
                          >
                            {languages.map((lang) => (
                              <option key={lang.code} value={lang.code}>
                                {lang.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {data?.text && (
                        <p className="text-white text-sm mb-2">{data.text}</p>
                      )}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
