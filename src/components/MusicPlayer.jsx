import React from 'react';

const MusicPlayer = ({ videoId }) => {
  if (!videoId) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-2 rounded-2xl shadow-2xl flex items-center gap-4">
        {/* Khung video nhỏ để đánh lừa trình duyệt di động */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-zinc-800">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            title="Audio"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        
        <div className="flex-1">
          <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">Now Playing</p>
          <p className="text-xs text-zinc-400 italic">Nhấn vào video nếu nhạc không tự phát</p>
        </div>
        
        {/* Nút hỗ trợ nếu bị chặn autoplay */}
        <div className="pr-2">
           <div className="w-8 h-8 rounded-full border-2 border-yellow-600 border-t-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;