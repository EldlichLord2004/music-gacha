import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

const MusicPlayer = ({ videoId, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef(null);

  // Reset trạng thái khi quay ra bài hát mới
  useEffect(() => {
    setIsPlaying(false);
    setIsLoaded(false);
  }, [videoId]);

  if (!videoId) return null;

  const togglePlay = (e) => {
    e.stopPropagation();

    if (!isLoaded) {
      // Lần đầu tiên nhấn: Nạp iframe và tự động phát
      setIsPlaying(true);
      setIsLoaded(true);
    } else {
      // Các lần sau: Gửi lệnh Play/Pause vào iframe hiện có mà không nạp lại
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[9999] animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div 
        onClick={togglePlay}
        className={`max-w-[420px] mx-auto p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center gap-4 cursor-pointer transition-all active:scale-95 group ${
          isPlaying ? 'bg-zinc-800 border-yellow-600/50 border' : 'bg-zinc-900 border-zinc-800 border'
        }`}
      >
        {/* PHẦN HIỂN THỊ ẢNH & ICON */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-zinc-700 shadow-lg">
          <img 
            src={thumbnail} 
            className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'opacity-100 scale-110' : 'opacity-40'}`} 
            alt="Cover" 
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            {isPlaying ? (
              <Pause size={24} fill="white" className="text-white drop-shadow-md" />
            ) : (
              <Play size={24} fill="white" className="text-white drop-shadow-md" />
            )}
          </div>
        </div>
        
        {/* THÔNG TIN TRẠNG THÁI */}
        <div className="flex-1 min-w-0">
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 ${isPlaying ? 'text-yellow-500' : 'text-zinc-500'}`}>
            {isPlaying ? 'Now Playing' : 'Music Paused'}
          </p>
          <p className={`text-xs font-medium truncate italic ${isPlaying ? 'text-zinc-200' : 'text-zinc-500'}`}>
            {isPlaying ? 'Đang phát âm thanh...' : 'Nhấn để tiếp tục nghe'}
          </p>
        </div>

        {/* HIỆU ỨNG SÓNG NHẠC */}
        {isPlaying && (
          <div className="flex items-end gap-1 h-3 px-2 text-yellow-500">
            <div className="w-0.5 bg-current animate-[bounce_1s_infinite_0.1s] h-full"></div>
            <div className="w-0.5 bg-current animate-[bounce_1s_infinite_0.3s] h-1/2"></div>
            <div className="w-0.5 bg-current animate-[bounce_1s_infinite_0.5s] h-3/4"></div>
          </div>
        )}

        {/* TRÌNH PHÁT TÀNG HÌNH (Sử dụng JS API) */}
        <div className="absolute opacity-0 pointer-events-none w-1 h-1 overflow-hidden">
          {isLoaded && (
            <iframe
              ref={iframeRef}
              /* Thêm enablejsapi=1 để YouTube cho phép điều khiển từ xa */
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&modestbranding=1&rel=0`}
              title="YouTube Audio Source"
              frameBorder="0"
              allow="autoplay"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;