// CareerTree
"use client";

import { useState } from "react";
import CareerTree from "../../components/CareerTree";
import { TreeNode } from "../../types/tree";

export default function Home() {
  const [career, setCareer] = useState("");
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!career) return;

    setLoading(true);
    const res = await fetch("/api/career", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ career }),
    });

    const data = await res.json();
    setTreeData(data.tree || []);
    setLoading(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">
        Career Path Generator
      </h1>

      <div className="flex gap-2 mb-5">
        <input
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          placeholder="Enter stream (e.g. Science)"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Generating career paths...</p>}
      {!loading && treeData.length > 0 && (
        <CareerTree data={treeData} />
      )}
    </div>
  );
}
