import React from 'react';
import { Mic2, User, PenTool, Quote } from 'lucide-react';

const GachaCard = ({ song, isRolling }) => {
  if (!song) return (
    <div className="h-80 flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-3xl text-zinc-500 italic">
      Sẵn sàng để quay thưởng bài hát...
    </div>
  );

  return (
    <div className={`bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl transition-all duration-500 ${isRolling ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
      <div className="relative h-64 bg-black">
        {song.thumbnail ? (
          <img 
            src={song.thumbnail} 
            alt={song.nameEng} 
            className="w-full h-full object-cover opacity-60" 
          />
        ) : (
          <div className="w-full h-full bg-zinc-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-3xl font-black text-yellow-500 uppercase tracking-tighter leading-tight">
            {song.nameEng}
          </h2>
          <p className="text-zinc-300 italic opacity-80">{song.nameJap}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm border-t border-zinc-800/50 pt-6">
          <div className="flex items-center gap-2 text-zinc-300">
            <Mic2 size={16} className="text-blue-500 shrink-0"/> 
            <span className="truncate"><b>Voice:</b> {song.voice}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <User size={16} className="text-green-500 shrink-0"/> 
            <span className="truncate"><b>Comp:</b> {song.composer}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <PenTool size={16} className="text-purple-500 shrink-0"/> 
            <span className="truncate"><b>Arr:</b> {song.arranger}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <Quote size={16} className="text-pink-500 shrink-0"/> 
            <span className="truncate"><b>Lyric:</b> {song.lyricist}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GachaCard;