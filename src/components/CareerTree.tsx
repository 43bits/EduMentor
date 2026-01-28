"use client";

import React from "react";
import Tree from "react-d3-tree";
import { TreeNode } from "../types/tree";

export default function CareerTree({ data }: { data: TreeNode[] }) {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      {data.length > 0 && (
        <Tree
          data={data}
          orientation="vertical"
          zoomable
          collapsible
        />
      )}
    </div>
  );
}
