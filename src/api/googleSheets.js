// const SHEET_ID = '12xgJn7NBzxhPbih5lGhBGx44nLy8zPFiB5QpFKbCQlU';
// const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// export const fetchSongs = async () => {
//   try {
//     const response = await fetch(CSV_URL);
//     const data = await response.text();
//     const rows = data.split('\n').slice(1);
    
//     return rows.map(row => {
//       const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      
//       // Hàm clean mới: Xóa bỏ tất cả dấu ngoặc kép bọc ngoài và khoảng trắng thừa
//       const clean = (str) => {
//         if (!str) return '';
//         return str.trim().replace(/^"+|"+$/g, '');
//       };

//       const ytLink = clean(columns[8]);

//       return {
//         stt: clean(columns[0]),
//         nameJap: clean(columns[1]),
//         nameEng: clean(columns[2]),
//         voice: clean(columns[3]),
//         arranger: clean(columns[4]),
//         composer: clean(columns[5]),
//         lyricist: clean(columns[6]),
//         meaning: clean(columns[7]),
//         ytLink: ytLink,
//         thumbnail: getYoutubeThumbnail(ytLink)
//       };
//     }).filter(song => song.nameEng !== "");
//   } catch (error) {
//     console.error("Lỗi lấy dữ liệu:", error);
//     return [];
//   }
// };

// function getYoutubeThumbnail(url) {
//   if (!url) return 'https://via.placeholder.com/480x270?text=No+Link';
//   const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const match = url.match(regExp);
//   if (match && match[2].length === 11) {
//     // Dùng hqdefault.jpg thay vì maxresdefault để chắc chắn video nào cũng hiện ảnh
//     return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
//   }
//   return 'https://via.placeholder.com/480x270?text=Invalid+Link';
// }

const SHEET_ID = '12xgJn7NBzxhPbih5lGhBGx44nLy8zPFiB5QpFKbCQlU';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

export const fetchSongs = async () => {
  try {
    const response = await fetch(CSV_URL);
    const data = await response.text();
    const rows = data.split('\n').slice(1);
    
    return rows.map(row => {
      const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      const clean = (str) => str?.trim().replace(/^"+|"+$/g, '') || '';

      const ytLink = clean(columns[8]);
      const videoId = getYoutubeId(ytLink);

      return {
        stt: clean(columns[0]),
        nameJap: clean(columns[1]),
        nameEng: clean(columns[2]),
        voice: clean(columns[3]),
        arranger: clean(columns[4]),
        composer: clean(columns[5]),
        lyricist: clean(columns[6]),
        meaning: clean(columns[7]),
        ytLink: ytLink,
        videoId: videoId,
        // Dùng mqdefault để đảm bảo 100% video đều có ảnh
        thumbnail: videoId ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` : ''
      };
    }).filter(song => song.nameEng !== "");
  } catch (error) {
    console.error("Lỗi fetch:", error);
    return [];
  }
};

function getYoutubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// function getYoutubeThumbnail(url) {
//   if (!url) return '';
//   const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const match = url.match(regExp);
//   return match && match[2].length === 11 
//     ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
//     : '';
// }