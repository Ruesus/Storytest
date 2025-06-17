import { useState } from "react";

const StoryGenerator = () => {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    setStory("");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4.1-nano",
            messages: [
              {
                role: "user",
                content:
                  "Write a first-person memory from the perspective of Felix — a man with bright red, slightly wavy hair, green eyes with golden flecks, fair skin with freckles, and a quiet, introspective soul. He is a photographer and explorer, deeply sensitive, nostalgic, and often alone with his thoughts. Use a literary and emotionally rich tone, blending realism with poetic detail. The memory should center around a specific moment in his life (e.g., childhood by the sea, his first photograph, meeting someone he loved, the loss of a friend, growing old in silence). Include sensory details: sounds, smells, textures, light, and atmosphere. The tone should be thoughtful, slightly melancholic, and full of affection for the world.",
              },
            ],
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const generatedText = data.choices[0].message.content;
        setStory(generatedText);
      } else {
        setStory("Error: " + (data.error?.message || "Something went wrong."));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setStory("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Story Generator</h1>
      <button onClick={generateStory} disabled={loading}>
        {loading ? "Generating..." : "Generate Story"}
      </button>
      <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>{story}</div>
    </div>
  );
};

export default StoryGenerator;