import React, { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';

const FeedbackItem = ({ item, index, languages }) => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [translation, setTranslation] = useState(item.translations['en']);
  const [loading, setLoading] = useState(false);

  const fetchTranslation = async (lang) => {
    setLoading(true);
    try {
      const res = await fetch(`https://your-api.com/feedback/${item.id}/translate/${lang}`);
      const data = await res.json(); // expected: { text: "...", audio: "..." }
      setTranslation(data);
    } catch (error) {
      console.error('Translation fetch error:', error);
    }
    setLoading(false);
  };

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setSelectedLang(newLang);

    // If translation already exists, reuse it
    if (item.translations[newLang]) {
      setTranslation(item.translations[newLang]);
    } else {
      fetchTranslation(newLang);
    }
  };

  return (
    <div className="bg-[#0d1117] border border-gray-700 p-4 rounded-xl transition duration-300 hover:border-purple-400">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-sm">Feedback #{index + 1}</span>
        <div className="flex items-center space-x-2">
          <Languages size={16} />
          <select
            value={selectedLang}
            onChange={handleLangChange}
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
      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : (
        <>
          <p className="text-sm mb-2 text-gray-200">{translation?.text}</p>
          {translation?.audio && (
            <audio controls src={translation.audio} className="w-full">
              Your browser does not support the audio element.
            </audio>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackItem;
