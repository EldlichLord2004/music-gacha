import React from 'react';

const MusicPlayer = ({ videoId }) => {
  if (!videoId) return null;

  return (
    // Chúng ta để opacity-0 và scale-0 để trình duyệt vẫn chạy nhưng người dùng không thấy
    <div className="fixed bottom-0 left-0 w-0 h-0 opacity-0 pointer-events-none">
      <iframe
        width="1"
        height="1"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title="YouTube Audio Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default MusicPlayer;