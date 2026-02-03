import React from 'react';
import { Play } from 'lucide-react';

const MusicPlayer = ({ videoId, thumbnail }) => {
  if (!videoId) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="max-w-[400px] mx-auto bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4">
        
        {/* Khung chứa Video nhưng bị che bởi Ảnh bìa */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black shrink-0 shadow-lg border border-zinc-700">
          
          {/* 1. Video YouTube nằm dưới cùng (trong suốt) */}
          <iframe
            className="absolute inset-0 w-full h-full scale-[2] opacity-0" 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            title="Audio Source"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>

          {/* 2. Ảnh bìa bài hát đè lên trên */}
          <img 
            src={thumbnail} 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
            alt="Cover"
          />

          {/* 3. Lớp phủ Icon Play để người dùng biết cần chạm vào */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
            <Play size={16} fill="white" className="text-white opacity-80" />
          </div>
        </div>
        
        {/* Thông tin bài hát */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.2em] mb-0.5">
            Now Playing
          </p>
          <p className="text-xs text-zinc-300 font-medium truncate italic">
            Chạm vào icon nếu nhạc chưa phát
          </p>
        </div>

        {/* Hiệu ứng sóng nhạc giả (Sóng nhạc nhảy nhẹ) */}
        <div className="flex items-end gap-0.5 h-3 px-2">
          <div className="w-0.5 bg-yellow-600 animate-[bounce_1s_infinite_0.1s] h-full"></div>
          <div className="w-0.5 bg-yellow-600 animate-[bounce_1s_infinite_0.3s] h-1/2"></div>
          <div className="w-0.5 bg-yellow-600 animate-[bounce_1s_infinite_0.5s] h-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;