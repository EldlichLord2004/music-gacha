import React from 'react';
import { RefreshCw, Play } from 'lucide-react';

const RollButton = ({ onClick, disabled, isRolling }) => {
  return (
    <button
      onClick={() => {
    // Kích hoạt rung điện thoại (nếu có hỗ trợ) để báo hiệu cho trình duyệt
    if (navigator.vibrate) navigator.vibrate(50); 
    onClick();
  }}
      disabled={disabled}
      className="w-full mt-8 py-5 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400 disabled:from-zinc-800 disabled:to-zinc-900 rounded-full font-black text-xl flex items-center justify-center gap-3 transition-all transform active:scale-90 shadow-[0_0_30px_rgba(202,138,4,0.3)] group"
    >
      {isRolling ? (
        <RefreshCw className="animate-spin" size={28} />
      ) : (
        <><Play fill="white" size={24} className="group-hover:translate-x-1 transition-transform" /> QUAY THƯỞNG</>
      )}
    </button>
  );
};
export default RollButton;