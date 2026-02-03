import { useState } from 'react';

export const useGacha = (songs) => {
  const [isRolling, setIsRolling] = useState(false);
  const [displaySong, setDisplaySong] = useState(null);
  const [result, setResult] = useState(null);

  const roll = () => {
    if (songs.length === 0 || isRolling) return;

    setIsRolling(true);
    setResult(null);
    let counter = 0;
    const maxRolls = 25; // Số lần nhảy trước khi dừng

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setDisplaySong(songs[randomIndex]);
      counter++;

      if (counter >= maxRolls) {
        clearInterval(interval);
        const finalSong = songs[randomIndex];
        setResult(finalSong);
        setDisplaySong(finalSong);
        setIsRolling(false);
      }
    }, 80);
  };

  return { isRolling, displaySong, result, roll };
};