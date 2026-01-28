// Use server-side fetch
export async function getPerplexitySummary(text: string) {
  if (!text) return { keyPoints: [], chapters: [] };

  const response = await fetch("https://api.perplexity.ai/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`
    },
    body: JSON.stringify({
      prompt: `Summarize this career talk video description into:
      1) Key points (5-10 bullet points)
      2) Table of contents (if timestamps are present, otherwise mock) 
      \n\nText:\n${text}`,
      model: "perplexity-ai"
    })
  });

  const data = await response.json();

  // Expected: { keyPoints: [...], chapters: [...] }  
  return {
    keyPoints: data.keyPoints || [],
    chapters: data.chapters || []
  };
}
