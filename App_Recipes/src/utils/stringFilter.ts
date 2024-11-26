export const stringFilter = (text: string) => {
  return text.replace(/ /g, '_');
};

export const reverseStringFilter = (text: string) => {
  return text.replace(/_/g, ' ');
};

export const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.split('v=')[1]?.split('&')[0];
  return `https://www.youtube.com/embed/${videoId}`;
};
