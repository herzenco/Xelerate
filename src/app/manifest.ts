import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Xelerate - Fractional Product Management',
    short_name: 'Xelerate',
    description: 'Expert fractional product management for startups and scale-ups',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    icons: [
      { src: '/favicon.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
