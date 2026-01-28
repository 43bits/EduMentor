"use client";

import { useState, useEffect } from "react";
import CareerTree from "../../components/CareerTree";
import { TreeNode } from "../../types/tree";
import { CAREERS } from "@/lib/careers";
import { LANGUAGES } from "@/lib/languages";
import { fetchYouTubeVideos } from "@/lib/youtube";

export default function HomePage() {
  /** CareerTree State */
  const [career, setCareer] = useState("");
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(false);

  /** Video/Language State */
  const [language, setLanguage] = useState("english");
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  /** Handle Career Search */
  const handleCareerSearch = async () => {
    if (!career) return;
    setLoading(true);

    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career }),
      });

      const data = await res.json();
      setTreeData(data.tree || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /** Fetch Videos */
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
    <main className="p-5 space-y-10 max-w-7xl mx-auto">
      {/* CAREER TREE SECTION */}
      <section className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          Career Path Generator
        </h1>

        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <input
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            placeholder="Enter stream (e.g., Science)"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={handleCareerSearch}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Generating career paths...</p>
        )}

        {!loading && treeData.length > 0 && (
          <div className="overflow-auto">
            <CareerTree data={treeData} />
          </div>
        )}
      </section>

      {/* LANGUAGE & VIDEOS SECTION */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
          Learning Resources & Videos
        </h2>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Career Search */}
          <div className="relative flex-1">
            <input
              placeholder="Search career (A–Z)"
              className="border p-2 w-full rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <div className="absolute bg-white border w-full max-h-48 overflow-y-auto z-10 rounded shadow">
                {CAREERS.filter((c) =>
                  c.toLowerCase().includes(search.toLowerCase())
                ).map((c) => (
                  <div
                    key={c}
                    className="p-2 hover:bg-gray-100 cursor-pointer rounded"
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

          {/* Language Dropdown */}
          <select
            className="border p-2 rounded w-48"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {Object.keys(LANGUAGES).map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* VIDEO PLAYER */}
        {selected && (
          <div className="grid md:grid-cols-[2fr_1fr] gap-6">
            <div className="flex flex-col">
              <iframe
                className="w-full aspect-video rounded-lg"
                src={`https://www.youtube.com/embed/${selected.id}`}
                allowFullScreen
              />

              <h3 className="mt-3 font-semibold text-lg">{selected.title}</h3>
              <button
                className="text-blue-600 text-sm mt-2 hover:underline"
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=${selected.channel}`,
                    "_blank"
                  )
                }
              >
                More about the speaker
              </button>
            </div>

            {/* VIDEO LIST */}
            <div className="space-y-3 overflow-y-auto max-h-[500px]">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => setSelected(v)}
                >
                  <img
                    src={v.thumbnail}
                    className="w-28 md:w-32 rounded object-cover"
                  />
                  <p className="text-sm font-medium">{v.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
