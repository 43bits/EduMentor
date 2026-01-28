/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

const BLOCKED = ["shorts", "#shorts", "vlog", "funny", "meme", "reel"];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q");
    const region = searchParams.get("region") || "IN";

    if (!q) return NextResponse.json({ videos: [] });

    const params = new URLSearchParams({
      key: process.env.YOUTUBE_API_KEY!,
      part: "snippet",
      q,
      type: "video",
      maxResults: "12",
      regionCode: region,

      // 🚫 NO SHORTS
      videoDuration: "medium",
      videoEmbeddable: "true",
      safeSearch: "strict",
    });

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params}`
    );

    const data = await res.json();

    if (!Array.isArray(data.items)) {
      return NextResponse.json({ videos: [] });
    }

    const videos = data.items
      .filter((item: any) => {
        const title = item.snippet.title.toLowerCase();
        if (BLOCKED.some(w => title.includes(w))) return false;
        return true;
      })
      .map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

    return NextResponse.json({ videos });
  } catch (e) {
    return NextResponse.json({ videos: [] });
  }
}
