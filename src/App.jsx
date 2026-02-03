import React, { useEffect, useState } from 'react';
import { fetchSongs } from './api/googleSheets';
import { useGacha } from './hooks/useGacha';
import GachaCard from './components/GachaCard';
import MusicPlayer from './components/MusicPlayer';
import RollButton from './components/RollButton';
import { Music, BookOpen } from 'lucide-react';

function App() {
  const [allSongs, setAllSongs] = useState([]);
  const { isRolling, displaySong, result, roll } = useGacha(allSongs);

  useEffect(() => {
    fetchSongs().then(setAllSongs);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-600 rounded-xl mb-3 rotate-3 shadow-lg">
          <Music size={24} className="text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter italic">SONG GACHA</h1>
        <p className="text-zinc-600 text-xs mt-1 uppercase tracking-widest font-bold">Auto Update from Drive</p>
      </div>

      {/* Main Layout - Chỉ 1 cột duy nhất */}
      <div className="w-full max-w-[450px] flex flex-col gap-6">
        
        {/* 1. Thẻ Gacha */}
        <GachaCard song={displaySong} isRolling={isRolling} />
        
        {/* 2. Nút Quay */}
        <RollButton onClick={roll} isRolling={isRolling} disabled={allSongs.length === 0} />

        {/* 3. Mục Ý nghĩa (Xuất hiện bên dưới nút) */}
        {!isRolling && result?.meaning && (
          <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-[24px] animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-2 mb-3 text-yellow-500/80">
              <BookOpen size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider">Song Story</h3>
            </div>
            <p className="text-zinc-400 leading-relaxed text-sm italic">
              "{result.meaning}"
            </p>
          </div>
        )}
      </div>

      {/* Trình phát nhạc ẩn (vẫn gọi để nhạc tự phát) */}
      {!isRolling && result && (
        <MusicPlayer videoId={result.videoId} thumbnail={result.thumbnail} />
      )}

      {/* Loading khi mới vào trang */}
      {allSongs.length === 0 && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="w-10 h-10 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default App;