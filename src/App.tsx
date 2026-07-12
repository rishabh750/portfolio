import { PortfolioTree } from './components/PortfolioTree'
import { useResume } from './data/ResumeContext'

export default function App() {
  const { profile } = useResume()
  return (
    <>
      <header className="topbar">
        <img
          className="topbar__avatar"
          src={`${import.meta.env.BASE_URL}photo.jpg`}
          alt={profile.name}
          width={54}
          height={54}
          loading="eager"
        />
        <div className="topbar__id">
          <span className="topbar__name">{profile.name}</span>
          <span className="topbar__title">
            {profile.title} · {profile.location}
          </span>
        </div>
      </header>

      <main className="app">
        <PortfolioTree />
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.name} · Built with React, TypeScript & Vite
        </p>
      </footer>
    </>
  )
}
