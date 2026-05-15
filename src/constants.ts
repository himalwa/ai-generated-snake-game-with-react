export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
  duration: number;
}

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Midnight Synth',
    artist: 'AI Generator X',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200&h=200',
    duration: 372
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Neural Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200&h=200',
    duration: 425
  },
  {
    id: '3',
    title: 'Neon Rain',
    artist: 'Lofi Mind',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=200&h=200',
    duration: 360
  }
];
