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
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4.1-nano",
            messages: [
              {
                role: "user",
                content:
                  "Generate a literary and emotionally rich first-person memory from the perspective of Felix — a man with bright red, slightly wavy hair, green eyes with golden flecks, fair skin with freckles. He is a photographer and wanderer, an introspective soul with a deep sensitivity and a nostalgic heart. His voice is quiet and thoughtful, filled with inner light but also touched by loss, solitude, and the fleeting beauty of the world. The memory should center on a single, significant moment in his life that left a lasting impression — it could be joyful (childhood by the sea, his first encounter with a camera, a moment of love or inspiration) or sorrowful (the loss of a friend, a goodbye, moving away, growing old in silence). The scene must be rich in sensory detail: smells, sounds, light, textures, movement of air. Use realistic yet poetic language, filled with reflection, emotional depth, and a tender affection for life. The tone should be contemplative, gently melancholic, and imbued with a quiet, philosophical understanding of existence.",
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
      <h1>GENERATOR WSPOMNIEŃ</h1>
      <button onClick={generateStory} disabled={loading}>
        {loading ? "Odszukuję..." : "Odszukaj wspomnienie"}
      </button>
      <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>{story}</div>
    </div>
  );
};

export default StoryGenerator;