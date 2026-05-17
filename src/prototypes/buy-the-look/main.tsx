import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './styles/index.css'
import posthog from 'posthog-js'

// Inicjalizacja PostHog z wyłączonymi funkcjami używającymi eval()
// (wymagane przez Content Security Policy środowiska)
posthog.init(
  'phc_Bbj2seiE7vbeoHq7W66puCuqfrKN48jmDNgqYpsFTNyY',
  {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
  }
)

// Przypisanie do obiektu window, aby gotowe przyciski od razu ożyły
;(window as any).posthog = posthog

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
