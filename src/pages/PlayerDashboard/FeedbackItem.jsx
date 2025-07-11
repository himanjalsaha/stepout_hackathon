import React, { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';




const FeedbackItem = ({ item, index, languages,listData }) => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [data,setData] = useState(listData);

//   useEffect(())

useEffect(()=>{
    setData(listData)
    setSelectedLang(listData?.original_language)
},[listData])





  const fetchTranslation = async (lang, text) => {
  setLoading(true);

  console.log(lang,text,'CHECK TEXT')

  try {
    const res = await fetch('http://13.233.199.154:8000/api/speak/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requested_lang: lang,     // e.g., 'en', 'es', etc.
        text: text       // text to be translated or spoken
      }),
    });

    if (!res.ok) throw new Error('Failed to fetch translation');

    const data = await res.json(); // expected format: { text: "...", audio: "..." }
console.log("DATA",data)
    setData(d => ({
      ...d,
      translated: data,
    }));

  } catch (error) {
    setSelectedLang('en')
    console.error('Translation fetch error:', error);
  }

  setLoading(false);
};

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    fetchTranslation(newLang,data?.final_message)
    setSelectedLang(newLang);

    // If translation already exists, reuse it
    // if (item.translations[newLang]) {
    //   setTranslation(item.translations[newLang]);
    // } else {
    //   fetchTranslation(newLang);
    // }
  };

  return (
    <div className="bg-[#0d1117] border border-gray-700 p-4 rounded-xl transition duration-300 hover:border-purple-400">
      <div className="flex justify-between items-center mb-2">
        {/* <span className="font-medium text-sm">Feedback #{index + 1}</span> */}
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
        data?.translated ?  <>
          <p className="text-sm mb-2 text-gray-200">{data?.translated?.translated_text}</p>
          {data?.translated?.audio_url && (
            <audio controls src={data?.translated?.audio_url} className="w-full">
              Your browser does not support the audio element.
            </audio>
          )}
        </> :<>
          <p className="text-sm mb-2 text-gray-200">{data?.final_message}</p>
          { data?.audio_url && (
            <audio controls src={data.audio_url} className="w-full">
              Your browser does not support the audio element.
            </audio>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackItem;
