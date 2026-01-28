// language.tsx
'use client';

import { useEffect, useState } from "react";
import { CAREERS } from "@/lib/careers";
import { LANGUAGES } from "@/lib/languages";
import { fetchYouTubeVideos } from "@/lib/youtube";

export default function VideosPage() {
  const [career, setCareer] = useState("");
  const [language, setLanguage] = useState("english");
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    const pickedCareer =
      career || CAREERS[Math.floor(Math.random() * CAREERS.length)];

    const query = `${pickedCareer} ${LANGUAGES[language]}`;

    fetchYouTubeVideos(query).then((v) => {
      setVideos(v);
      setSelected(v[0] || null);
    });
  }, [career, language]);

  return (
    <main className="p-6 space-y-4">
      {/* FILTER BAR */}
      <div className="flex gap-4 flex-wrap">
        {/* Career Search */}
        <div className="relative">
          <input
            placeholder="Search career (A–Z)"
            className="border p-2 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <div className="absolute bg-white border w-full max-h-48 overflow-y-auto z-10">
              {CAREERS.filter(c =>
                c.toLowerCase().includes(search.toLowerCase())
              ).map(c => (
                <div
                  key={c}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setCareer(c);
                    setSearch("");
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language */}
        <select
          className="border p-2"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {Object.keys(LANGUAGES).map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* VIDEO PLAYER */}
      {selected && (
        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          <div>
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${selected.id}`}
              allowFullScreen
            />

            <h2 className="mt-2 font-semibold">{selected.title}</h2>

            <button
              className="text-blue-600 text-sm mt-2"
              onClick={() =>
                window.open(
                  `https://www.google.com/search?q=${selected.channel}`,
                  "_blank"
                )
              }
            >
              Find more info about speaker
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-3">
            {videos.map(v => (
              <div
                key={v.id}
                className="flex gap-2 cursor-pointer"
                onClick={() => setSelected(v)}
              >
                <img src={v.thumbnail} className="w-32" />
                <p className="text-sm">{v.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
