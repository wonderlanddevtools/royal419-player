# Royal 419 - Interactive Web Player

An interactive web music player for "Royal 419" - a satirical album themed around Nigerian prince email scams. This project creates a seamless digital extension of the physical print magazine experience.

## 🎵 Album

**Royal 419! Music & Lyrics By! The Prince of Nigeria**

Six tracks of untouchable romance, wire-transfer ballads, and routing number funk:

1. International Luv (Western Union Mix)
2. Urgent Opportunity
3. Wire-Transferrable Love
4. U Got the Routing #!
5. Money Never Lies, but, I might
6. Beneficiary Dreams

## 🎨 Design

The player matches the physical magazine design with:
- Purple starry background (#3d2b7c)
- Yellow accent color (#f9ed32)
- Hand-drawn/artistic typography
- Interactive 3D CD cover animation
- Smooth, production-grade animations

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Storage)
- **Animations**: Framer Motion + GSAP
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wonderlanddevtools/royal419-player.git
cd royal419-player
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
royal419-player/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main player page
├── components/
│   ├── Background.tsx      # Animated starry background
│   ├── CDCover.tsx         # Interactive CD cover
│   ├── AudioPlayer.tsx     # Custom audio controls
│   └── TrackList.tsx       # Track selection UI
├── hooks/
│   └── useAudioPlayer.ts   # Audio state management
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── tracks.ts           # Track metadata
└── styles/
    └── animations.ts        # GSAP configs
```

## 🎯 Features

- ✅ Interactive 3D CD cover animation
- ✅ Custom audio player with full controls
- ✅ Click-to-cue track selection
- ✅ GSAP parallax background effects
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Optimized for production
- ✅ QR code accessible

## 📱 QR Code Access

Scan the QR code in the physical magazine to access the player directly from your mobile device.

## 🎨 Design Credits

Album artwork and design by The Prince of Nigeria for Superbloom House.

## 📄 License

All rights reserved.

## 🔗 Links

- [Live Demo](https://royal419-player.vercel.app) - **Now Live!** 🎉
- [GitHub Repository](https://github.com/wonderlanddevtools/royal419-player)
- [Superbloom House](https://superbloom.house)

---

**ORDER NOW! ROYAL 419** 🎵
