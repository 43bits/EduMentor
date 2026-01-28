export async function fetchYouTubeVideos(query: string, region = "IN") {
  const res = await fetch(
    `/api/youtube?q=${encodeURIComponent(query)}&region=${region}`
  );
  const data = await res.json();
  return data.videos || [];
}
