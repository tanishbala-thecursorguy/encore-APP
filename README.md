# Encore - Social Music App

Eine moderne Social-Media-App für Musik-Liebhaber mit animierten UI-Komponenten.

## 🚀 Features

- ✅ Animierte Navigationsleiste mit süßem Maskottchen
- ✅ Feed mit Bild-Posts
- ✅ Like-Funktion (doppeltes Tippen + grüne Animation)
- ✅ Kommentar-Modal
- ✅ Share-Funktion
- ✅ Floating Action Button mit erweiterbaren Icons
- ✅ Responsives Design
- ✅ Dark Theme (#01302e / #024c46)

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Animationen:** Framer Motion
- **Icons:** Lucide React
- **Bilder:** Next.js Image Optimization

## 📦 Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Die App läuft dann auf [http://localhost:3000](http://localhost:3000)

## 📁 Projektstruktur

```
/app
  /page.tsx              # Home Feed Page
  /layout.tsx            # Root Layout
  /globals.css           # Globale Styles
/components
  /ui
    /anime-navbar.tsx    # Animierte Navigationsleiste
    /anime-navbar-demo.tsx # Demo/Config für Navbar
    /floating-action-button.tsx # Floating Plus Button
    /post-card.tsx       # Feed Post Komponente
/lib
  /utils.ts              # Utility Funktionen
```

## 🎨 UI-Verhalten

- **Einmal tippen:** Bild dimmen (Pause-Effekt)
- **Doppelt tippen:** Like-Animation (grünes Herz)
- **Kommentar-Button:** Öffnet Modal
- **Share-Button:** Kopiert Link in Zwischenablage
- **Plus-Button:** Erweitert Feature-Icons (Home, Post, Reels, Friends, Community)

## 🎨 Farbschema

- Primär: `#01302e` (Dunkles Grün)
- Akzent: `#024c46` (Mittleres Grün)
- Highlight: `#10b981` (Grün)

## 📱 Responsive Design

Die App ist vollständig responsive und funktioniert auf:
- 📱 Mobile (mit Icon-Navigation)
- 💻 Desktop (mit Text-Navigation)

## 🔧 Anpassungen

### Neue Posts hinzufügen

Bearbeite die `posts` Array in `/app/page.tsx`:

```tsx
const posts = [
  {
    username: "dein_username",
    imageUrl: "https://images.unsplash.com/photo-xxxxx",
    description: "Deine Beschreibung",
    hashtags: ["tag1", "tag2"],
  },
]
```

### Navigation anpassen

Bearbeite die `items` Array in `/components/ui/anime-navbar-demo.tsx`:

```tsx
const items = [
  {
    name: "Tab Name",
    url: "/route",
    icon: IconComponent,
  },
]
```

## 📄 Lizenz

MIT

