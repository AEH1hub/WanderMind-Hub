import { GoogleGenAI } from "@google/genai";
import { YouTubeMetadata, VideoComponents, GeneratedArticle, VideoScene } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const genericErrorHandler = (error: unknown, context: string) => {
    console.error(`Error in ${context}:`, error);
    if (error instanceof Error) {
        return `An error occurred during ${context}: ${error.message}. Please check the console for details.`;
    }
    return `An unknown error occurred during ${context}. Please try again.`;
}

// Utility to parse potentially fenced JSON
const parseJson = (text: string) => {
    let jsonStr = text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }
    return JSON.parse(jsonStr);
};


export const generatePodcastSummary = async (
  title: string,
  teaser: string
): Promise<string> => {
  const prompt = `You are a blog writer for the 'WanderMind Hub' podcast. Your task is to create a compelling and well-structured summary for a podcast episode. The summary should be engaging, easy to read, and give a clear idea of what the episode is about.

Podcast Episode Title: "${title}"
Episode Teaser: "${teaser}"

Based on this information, please generate a summary. The summary should be at least 3-4 paragraphs long. Use markdown for formatting, like using headers for sections or bold text for emphasis. Make it sound like an exciting recap that encourages people to listen to the full episode.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return genericErrorHandler(error, "summary generation");
  }
};

export const generatePodcastScript = async (topic: string): Promise<string> => {
  const prompt = `You are an expert podcast scriptwriter for 'WanderMind Hub', a podcast about mindful travel and personal growth. Your task is to generate a complete, high-quality podcast script based on the following topic, using real-time information and trends to ensure it is current and vital.

Topic: "${topic}"

The script should be engaging, conversational, and structured with the following sections:
- **Intro:** Start with a "[SOUND EFFECT: short, inspiring intro music]" cue. The host gives a warm welcome, introduces the episode's topic, and presents a hook using recent trends or news to grab the listener's attention.
- **Segment 1:** The first main point. Dive deep with examples, storytelling, or recent data.
- **Segment 2:** The second main point, building on the first.
- **(Optional) Segment 3:** If the topic is complex, add a third segment to cover another angle.
- **Outro:** The host summarizes the key takeaways. Include a call to action (e.g., "Find more on wandermindhub.com", "Subscribe for more stories"). End with a "[SOUND EFFECT: gentle, fading outro music]" cue.

Use markdown for formatting. For example:
**Host:** Welcome back to WanderMind Hub...
[SOUND EFFECT: gentle waves]`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: {
            tools: [{googleSearch: {}}],
        },
    });
    return response.text;
  } catch (error) {
    return genericErrorHandler(error, "podcast script generation");
  }
};

export const generateArticleFromScript = async (script: string): Promise<GeneratedArticle | string> => {
    const prompt = `You are a skilled content editor for the 'WanderMind Hub' blog. Transform the provided podcast script into a well-structured blog article.

Podcast Script:
---
${script}
---

Your task is to provide a single, minified JSON object with the following keys:
- "title": A compelling, SEO-friendly title for the article.
- "content": The full article content, converted from the script. Use markdown for formatting (headings, lists, bold text). Ensure it's readable and engaging for a blog audience. Remove host cues and sound effects.
- "featuredImagePrompt": A short, conceptual prompt for an AI image generator, focusing on the core theme of the article. Example: "A solo traveler on a cliff overlooking a misty waterfall in Iceland."

Do not include any other text or markdown formatting. The output must be only the JSON object.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: { responseMimeType: "application/json" },
        });
        return parseJson(response.text) as GeneratedArticle;
    } catch(error) {
        return genericErrorHandler(error, "article generation");
    }
};

export const generateYouTubeMetadata = async (script: string): Promise<YouTubeMetadata | string> => {
    const prompt = `You are a YouTube content strategist for 'WanderMind Hub'. Based on the following podcast script, generate a full metadata and strategy kit for a YouTube video.

Podcast Script:
---
${script}
---

Provide the output in a single, minified JSON object with the following structure:
{
  "title": "A catchy, SEO-friendly YouTube title, under 70 characters.",
  "description": "A detailed, engaging YouTube description (2-4 paragraphs) with a summary, key takeaways, and a call-to-action to visit wandermindhub.com.",
  "tags": [ "An array of 10-15 relevant keywords and phrases." ],
  "shortsScript": "A punchy, concise script (3-4 sentences, under 50 seconds read time) for a YouTube Short, summarizing the most exciting point of the video.",
  "recommendations": {
    "length": "Recommended video length (e.g., '8-12 minutes').",
    "format": "Recommended format (e.g., 'Talking head with B-roll', 'Animated slideshow').",
    "advice": "A key strategic tip for this video's success (e.g., 'Focus on the stunning visuals in the first 30 seconds to boost retention.')."
  }
}

Do not include any other text or markdown formatting. The output must be only the JSON object itself.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: { responseMimeType: "application/json" },
        });
        return parseJson(response.text) as YouTubeMetadata;
    } catch (error) {
        return genericErrorHandler(error, "YouTube metadata generation");
    }
};

export const generateVideoComponents = async (title: string, script: string): Promise<VideoComponents | string> => {
    const jsonPrompt = `You are an AI video producer for 'WanderMind Hub'. Based on the provided podcast script, create a "Video Production Kit".

Podcast Script:
---
${script}
---

Your task is to generate a single, minified JSON object with the following structure:
{
  "voiceOverScript": "A slightly condensed, more direct version of the full podcast script, formatted for a voice-over artist to read. Break it into short, clear paragraphs.",
  "featuredImagePrompt": "A conceptual prompt for the thumbnail image, describing the core visual theme. e.g. 'A solo traveler meditating on a serene beach at sunrise.'",
  "scenes": [
    {
      "imagePrompt": "A visually stunning prompt for an AI image generator for scene 1. Style: photorealistic, cinematic, inspiring.",
      "subtitle": "A short, engaging subtitle for this scene, derived from the script.",
      "voiceOverChunk": "The corresponding small chunk of the voice-over script for this scene."
    }
  ]
}

Ensure there are exactly 5 scenes. The output must be only the JSON object.`;

    try {
        const jsonResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: jsonPrompt,
            config: { responseMimeType: "application/json" },
        });

        const parsedResult = parseJson(jsonResponse.text) as Omit<VideoComponents, 'featuredImageUrl' | 'scenes'> & { scenes: Omit<VideoScene, 'imageUrl'>[] };

        if (!parsedResult.featuredImagePrompt || !parsedResult.scenes || parsedResult.scenes.length === 0) {
            throw new Error("The AI did not generate sufficient data for the video kit.");
        }

        // Generate the featured image (thumbnail)
        const featuredImageUrl = await generateYouTubeThumbnail(title, parsedResult.featuredImagePrompt);
        if (!featuredImageUrl.startsWith('data:image')) {
            throw new Error("Failed to generate the featured thumbnail image.");
        }
        
        // Generate all scene images in parallel
        const sceneImageUrls = await Promise.all(
            parsedResult.scenes.map(s => generateImageFromPrompt(s.imagePrompt))
        );

        if (sceneImageUrls.some(url => typeof url !== 'string' || !url.startsWith('data:image'))) {
            throw new Error("Failed to generate one or more scene images.");
        }
        
        const finalScenes: VideoScene[] = parsedResult.scenes.map((scene, index) => ({
            ...scene,
            imageUrl: sceneImageUrls[index],
        }));

        return { 
            ...parsedResult, 
            featuredImageUrl, 
            scenes: finalScenes
        };

    } catch (error) {
        return genericErrorHandler(error, "video components generation");
    }
};


export const getTrendingTopics = async (): Promise<string[] | string> => {
    const prompt = `You are a JSON API. Your sole function is to return a valid JSON array of 4 strings.
The topics must be current, popular, and slightly niche, focusing on mindfulness, sustainability, adventure, or digital nomads, based on current search trends.

**CRITICAL INSTRUCTION:** Your entire response MUST be ONLY the JSON array. Do not include the word "json", markdown code fences (\`\`\`), or any other text, explanation, or markdown formatting.

Example of the only valid output format:
["Topic 1", "Topic 2", "Topic 3", "Topic 4"]`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-04-17',
            contents: prompt,
            config: { 
                tools: [{googleSearch: {}}],
            }
        });
        return parseJson(response.text) as string[];
    } catch(error) {
        return genericErrorHandler(error, "trending topics generation");
    }
}

export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
    const imageResponse = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });

    const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
}

export const generateYouTubeThumbnail = async (title: string, basePrompt: string): Promise<string> => {
    const fullPrompt = `Create a viral-style, hyper-realistic, 8k resolution YouTube thumbnail for a video titled: "${title}".
Style: MrBeast-inspired, focusing on high-impact visuals.
Background: A dynamic, high-contrast, and emotionally resonant depiction of: "${basePrompt}".
Text Overlay: Include the exact title "${title}" as text on the image. The text should be large, bold, and in a modern sans-serif font like 'Bebas Neue' or 'Impact'. It must have a thick white fill and a thin black outline for maximum readability and pop.
Aesthetics: The overall mood must be exciting and intriguing. Use vibrant, saturated colors and dramatic, cinematic lighting. The composition should draw the viewer's eye. Make it look extremely clickable.`;

    try {
        const imageResponse = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: fullPrompt,
            config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
        });

        const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    } catch(error) {
         console.error("Error generating thumbnail:", error);
         // Fallback to a simpler prompt if the complex one fails
         return generateImageFromPrompt(`Cinematic, vibrant, high-contrast image representing: ${basePrompt}`);
    }
};