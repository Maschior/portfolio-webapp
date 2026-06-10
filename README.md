# My Portfolio

📖 [Versão em Português aqui](README.pt-br.md)

🏗️ **Note:** This is the application front-end code. The AWS Infrastructure (Terraform & Ansible) for this project is managed in a separate repository here: [github.com/Maschior/portfolio](https://github.com/Maschior/portfolio).

---

Welcome to the repository of my personal portfolio website. This is a modern, responsive, and fully localized (i18n) web application built using Next.js 15, Tailwind CSS, and Framer Motion.

## Live Demo
You can access my live portfolio at: [maschior.com](https://maschior.com)

## Features
- **Bilingual Support (i18n):** Complete routing and content translation for English and Portuguese via `next-intl`.
- **Modern UI/UX:** Built with sleek typography, custom component cards, and a clean layout.
- **Fluid Animations:** Smooth micro-interactions and scroll reveals powered by `framer-motion`.
- **Responsive Design:** Optimized for all screen sizes (mobile, tablet, desktop).
- **SEO & Structured Data:** Semantic HTML5 elements and schema.org JSON-LD metadata for optimized search engine visibility.

## Stack
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Localization:** [next-intl](https://next-intl.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Package Manager:** `pnpm`

## Directory Structure
```bash
portfolio-webapp/
├── messages/            # i18n JSON files (en.json, pt.json)
├── public/              # Static assets (images, profile picture)
├── src/
│   ├── app/             # Next.js App Router (locale routing)
│   │   └── [locale]/    # Localized pages (home, about, contact)
│   ├── components/      # UI components (Badge, Button, Avatar)
│   ├── lib/             # Navigation wrappers and structured metadata helpers
│   └── styles/          # Tailwind & CSS globals
├── package.json         # Scripts and dependencies
└── tailwind.config.ts   # Custom theme definitions
```

## Local Development

Follow the instructions below to run this project locally:

### 1. Prerequisites
Ensure you have **Node.js (>=22)** and **pnpm** installed.

### 2. Installation
Clone this repository and install the dependencies:
```bash
git clone https://github.com/Maschior/portfolio-webapp.git
cd portfolio-webapp
pnpm install
```

### 3. Run Development Server
Start the Next.js development server:
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
To build the application:
```bash
pnpm run build
pnpm run start
```

## Recent changes
- **Custom `video.js` Video Player (Panda Video Skin)**: Implemented a robust React wrapper for `video.js` featuring custom playback rates, MIME detection, GPU-hardware acceleration, and memory cleanup. Styled after the Panda Video player with a pulsing circular play button, floating rounded control bar, and glassmorphic blur (`backdrop-blur-md`).
- **Lightbox Media Carousel**: Implemented a modal popup using Framer Motion that darkens and blurs the viewport, displaying images and videos with pagination controls, keyboard shortcuts (`Esc`, `ArrowLeft`, `ArrowRight`), and body scroll lock.
- **Dynamic Media Discovery API**: Created `/api/project-images` to scan directory files under `public/projects/[project]` dynamically for image and video formats, sorting cover files first.
- **Hover Zoom & Debounced Previews**: Added interactive focus styling to project cards (scales to `1.04`, elevates `-translate-y-2`, shadow-2xl) with a `150ms` hover trigger delay (debounce) and `preload="none"` on video thumbnails to prevent network and CPU spikes.
- **Contact Form EmailJS Integration**: Integrated EmailJS API to send contact form submissions, complete with form validation, submission states, and multilingual translations.

