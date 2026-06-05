export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  try {
    const { messages, system } = req.body;
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "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",
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "web-search-2025-03-05"
      },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages, tools: [{ type: "web_search_20250305", name: "web_search" }] })
    });
    const data = await response.json();
    const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("") || "No response.";
    return res.status(200).json({ reply: text });
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
}