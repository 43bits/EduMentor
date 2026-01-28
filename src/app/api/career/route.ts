/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { TreeNode } from "../../../types/tree";

export async function POST(req: NextRequest) {
  try {
    const { career } = await req.json();

    const res = await fetch(
      "https://api.perplexity.ai/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        },
        body: JSON.stringify({
          model: "sonar-pro",
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content:
                "You are a JSON-only API. Return VALID JSON only. No text, no markdown.",
            },
            {
              role: "user",
              content: `
Return a career tree for "${career}".
The JSON MUST match this structure exactly:

{
  "name": "Science",
  "children": [
    {
      "name": "Medical",
      "children": [
        {
          "name": "MBBS",
          "children": [
            { "name": "Doctor" },
            { "name": "Surgeon" }
          ]
        }
      ]
    }
  ]
}

Rules:
- ALWAYS include children arrays
- Use deep nesting
- Return ONLY JSON
`,
            },
          ],
        }),
      }
    );

    // 🔥 READ RAW RESPONSE
    const raw = await res.text();

    console.log("========== PERPLEXITY RAW RESPONSE ==========");
    console.log(raw);
    console.log("============================================");

    // ❌ HTML error page
    if (raw.startsWith("<")) {
      console.error("Perplexity returned HTML (API error)");
      return NextResponse.json({ tree: [] }, { status: 500 });
    }

    // 🔍 Try parsing JSON
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("JSON PARSE FAILED");
      console.error(raw);
      return NextResponse.json({ tree: [] }, { status: 500 });
    }

    console.log("========== PARSED JSON ==========");
    console.log(JSON.stringify(parsed, null, 2));
    console.log("================================");

    // 🧠 Extract tree (handle both formats)
    let tree: TreeNode | null = null;

    // Case 1: JSON directly returned
    if (parsed.name) {
      tree = parsed;
    }

    // Case 2: Wrapped in chat completion
    if (!tree && parsed.choices?.[0]?.message?.content) {
      const inner = parsed.choices[0].message.content;
      console.log("====== INNER MESSAGE CONTENT ======");
      console.log(inner);
      console.log("===================================");

      try {
        tree = JSON.parse(inner);
      } catch {
        console.error("Inner content is not valid JSON");
      }
    }

    if (!tree) {
      console.error("NO VALID TREE FOUND");
      return NextResponse.json({ tree: [] });
    }

    console.log("========== FINAL TREE OBJECT ==========");
    console.log(JSON.stringify(tree, null, 2));
    console.log("======================================");

    // react-d3-tree expects array
    return NextResponse.json({ tree: [tree] });
  } catch (err) {
    console.error("Career API error:", err);
    return NextResponse.json({ tree: [] }, { status: 500 });
  }
}
