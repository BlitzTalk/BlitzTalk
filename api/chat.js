export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  try {
    const { messages, system } = req.body;
    const k = ["sk-ant-api03-OCmuLJGQ1sgYcyjVBJnBA11dgMpQUU1imD0ml4vTdbzMMqjU7KGHlj","-TbNA--dUR_o9eRKNMN3dGFsimfHVFfA-B4mRoAAA"].join("");
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": k,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages })
    });
    const data = await response.json();
    if (!response.ok) return res.status(200).json({ reply: "API Error: " + JSON.stringify(data.error) });
    const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("") || "No response.";
    return res.status(200).json({ reply: text });
  } catch (err) {
    return res.status(200).json({ reply: "Error: " + err.message });
  }
}