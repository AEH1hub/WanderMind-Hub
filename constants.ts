import { PodcastEpisode, Article } from './types';

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 1,
    title: "Finding Serenity in Kyoto's Zen Gardens",
    teaser: "Join us as we explore the tranquil beauty of Kyoto's most famous zen gardens. Discover the history, philosophy, and calming power of these meditative spaces.",
    date: '2024-07-15',
    duration: '28 min',
    audioSrc: 'https://cdn.pixabay.com/audio/2024/04/18/audio_313e895a12.mp3',
    coverArt: 'https://images.pexels.com/photos/2249290/pexels-photo-2249290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    title: 'The Art of Slow Travel in the Italian Countryside',
    teaser: 'We chat with travel writer Elena Rossi about embracing a slower pace and truly connecting with the culture, food, and people of rural Italy.',
    date: '2024-07-08',
    duration: '35 min',
    audioSrc: 'https://cdn.pixabay.com/audio/2023/11/22/audio_101e3b9a53.mp3',
    coverArt: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    title: 'A Mindful Approach to Working Anywhere',
    teaser: 'Digital nomad expert Alex Chen shares strategies for staying grounded, productive, and mentally healthy while living a life on the move.',
    date: '2024-07-01',
    duration: '42 min',
    audioSrc: 'https://cdn.pixabay.com/audio/2023/10/08/audio_34b971a8f9.mp3',
    coverArt: 'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    title: "Conquering Anxiety: A Hiker's Guide to the Scottish Highlands",
    teaser: "Can the wild landscapes of Scotland help heal the mind? We delve into the therapeutic benefits of long-distance hiking and facing nature's challenges.",
    date: '2024-06-24',
    duration: '31 min',
    audioSrc: 'https://cdn.pixabay.com/audio/2022/11/18/audio_83a1f8b3c3.mp3',
    coverArt: 'https://images.pexels.com/photos/534124/pexels-photo-534124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
   {
    id: 5,
    title: "Sustainable Souvenirs: Bringing Home Mindful Memories",
    teaser: "How to shop ethically and sustainably while traveling. We explore artisan markets, local crafts, and the joy of buying items with a story.",
    date: '2024-06-17',
    duration: '25 min',
    audioSrc: 'https://cdn.pixabay.com/audio/2024/05/13/audio_108154944d.mp3',
    coverArt: 'https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 6,
    title: "Lisbon's Culinary Secrets: A Food Lover's Journey",
    teaser: "From pastéis de nata to fresh seafood, we take a delicious audio tour of Lisbon's hidden culinary gems with a local food blogger.",
    date: '2024-06-10',
    duration: '38 min',
    audioSrc: 'https://cdn.pixabay.com/audio/2024/02/05/audio_59c7895e69.mp3',
    coverArt: 'https://images.pexels.com/photos/1707920/pexels-photo-1707920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Your Minimalist Packing Guide for a 2-Week Trip',
    category: 'Guides',
    excerpt: 'Learn how to pack light without sacrificing style or comfort. Our guide covers everything from capsule wardrobes to essential gear.',
    featuredImage: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: `Packing for a two-week trip can feel like a daunting puzzle. How do you fit everything you need into a single bag while still looking and feeling your best? The answer lies in minimalist packing, a mindful approach that prioritizes versatility, quality, and simplicity. It's not about deprivation; it's about freedom.
    
## The Capsule Wardrobe
The core of minimalist packing is the capsule wardrobe. This involves selecting a small collection of essential items that can be easily mixed and matched. Start with a neutral color palette (black, white, grey, beige) and add one or two accent colors. For a two-week trip, consider: 5 tops, 3 bottoms (trousers, shorts, or a skirt), 2 outerwear pieces (a jacket and a sweater), and 2 pairs of versatile shoes.
    
## Roll, Don't Fold
To maximize space and minimize wrinkles, roll your clothes tightly instead of folding them. Packing cubes are a minimalist's best friend. They not only compress your clothing but also keep your luggage organized. Designate cubes for tops, bottoms, underwear, and electronics to make finding what you need effortless.
    
## The Essentials
Beyond clothing, be ruthless with your other items. Opt for solid toiletries (shampoo bars, solid perfume) to save space and avoid liquid restrictions. A universal power adapter, a portable charger, and a reusable water bottle are non-negotiable. Finally, always leave a little extra space in your bag. You never know what treasures you might want to bring home from your mindful journey.`,
  },
  {
    id: 2,
    title: '5 Mindfulness Exercises for Anxious Flyers',
    category: 'Wellness',
    excerpt: 'Turn flight anxiety into an opportunity for mindfulness. These simple exercises can help you stay calm and centered at 30,000 feet.',
    featuredImage: 'https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: `For many, the thought of flying can trigger significant anxiety. The enclosed space, turbulence, and lack of control can be overwhelming. However, by reframing this time, you can transform it from a source of stress into a powerful opportunity for mindfulness and self-care. Here are five simple exercises to help you find calm among the clouds.

### 1. The 4-7-8 Breathing Technique
This simple yet powerful breathing exercise can calm a racing heart and a worried mind. Close your eyes and exhale completely through your mouth. Close your mouth and inhale quietly through your nose for a count of four. Hold your breath for a count of seven. Finally, exhale completely through your mouth for a count of eight. Repeat this cycle three to five times, focusing solely on the rhythm of your breath.

### 2. Mindful Observation
Engage your senses to ground yourself in the present moment. Notice five things you can see (the texture of the seat in front of you, the shape of the clouds). Acknowledge four things you can feel (the pressure of your feet on the floor, the fabric of your clothes). Identify three things you can hear (the hum of the engine, the rustle of a magazine). Notice two things you can smell. Finally, notice one thing you can taste. This technique, known as the 5-4-3-2-1 method, pulls your focus away from anxious thoughts and into your immediate environment.

### 3. Body Scan Meditation
Starting with your toes, bring your attention to each part of your body, one by one. Notice any sensations—warmth, coolness, tingling, pressure—without judgment. As you move up your body, consciously release any tension you're holding. Clench and then release your fists. Drop your shoulders away from your ears. Unclench your jaw. This practice not only relaxes you physically but also strengthens the connection between your mind and body.`,
  },
  {
    id: 3,
    title: 'How Sustainable Travel Can Change the World',
    category: 'Sustainability',
    excerpt: 'Discover how conscious travel choices can support local communities, protect ecosystems, and create a more equitable world.',
    featuredImage: 'https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: `Sustainable travel is more than a buzzword; it's a powerful mindset that can transform our impact on the world. It’s about making conscious choices that protect our planet's natural beauty, support local cultures and economies, and ensure that future generations can enjoy the wonders of travel as we do. Every decision, from the transportation we choose to the souvenirs we buy, has a ripple effect.

## Economic Empowerment
One of the most direct ways to travel sustainably is by ensuring your money benefits the local community. Stay in locally-owned guesthouses instead of international chains. Eat at family-run restaurants and buy crafts directly from artisans. By doing so, you contribute directly to the local economy, empowering communities and fostering a more equitable tourism model that values authenticity over commercialization.

## Environmental Stewardship
Our travel choices have a significant environmental footprint. We can mitigate this by choosing lower-impact transportation like trains, offsetting our carbon emissions for flights, and packing reusable items like water bottles and shopping bags to reduce single-use plastic waste. When exploring natural areas, always stick to designated trails, never disturb wildlife, and follow the principles of "Leave No Trace."

## Cultural Respect
Mindful travel is respectful travel. Before you visit a new destination, take the time to learn about its local customs, traditions, and social norms. Dress modestly where appropriate, ask for permission before taking photographs of people, and learn a few basic phrases in the local language. This not only shows respect but also opens the door to more meaningful and authentic interactions, transforming you from a mere tourist into a welcome guest.`,
  },
  {
    id: 4,
    title: 'Show Notes: The Art of Slow Travel',
    category: 'Show Notes',
    relatedPodcastId: 2,
    excerpt: 'All the links, books, and resources mentioned in our episode with Elena Rossi on the joy of slow travel in Italy.',
    featuredImage: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: `Thank you for tuning into our conversation with the insightful Elena Rossi about the art of slow travel. As promised, here are all the resources, books, and links we discussed in the episode.

### Books Mentioned
*   **"In Praise of Slowness: Challenging the Cult of Speed" by Carl Honoré:** While not strictly a travel book, this is the foundational text that inspired Elena's philosophy on slowing down in all aspects of life.
*   **"Under the Tuscan Sun" by Frances Mayes:** A classic that beautifully captures the essence of immersing oneself in a single region and embracing the rhythm of local life in Italy.

### Elena's Recommended Resources
*   **Slow Food Foundation for Biodiversity:** Elena is a passionate supporter of the Slow Food movement, which advocates for preserving traditional, sustainable food cultures. You can learn more about their work and find local chapters at [slowfood.com](https://www.slowfood.com).
*   **Workaway and Worldpackers:** For travelers looking to stay longer in one place, Elena recommended these platforms for finding volunteer opportunities in exchange for accommodation, allowing for deep cultural immersion.
*   **Agriturismo.it:** This is Elena's go-to resource for finding authentic farm stays in Italy, which offer a unique opportunity to connect with the land and local producers.

### Connect with Elena
You can follow Elena's own slow travel journeys and read her beautiful prose on her blog, "An Italian Interlude," and on her Instagram @ElenaRossiTravels. We highly recommend her guide to off-the-beaten-path villages in Umbria!`,
  },
];