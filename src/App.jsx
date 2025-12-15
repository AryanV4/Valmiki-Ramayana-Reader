import { useState, useEffect } from 'react'
import Header from './components/Header'
import Reader from './components/Reader'

function App() {
  const [currentSelection, setCurrentSelection] = useState({
    kanda: 'Bala Kanda',
    sarga: '1'
  })

  // Theme State
  const [theme, setTheme] = useState('light')
  const [viewMode, setViewMode] = useState('line');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container" data-theme={theme}>
      <Header
        currentSelection={currentSelection}
        onSelectionChange={setCurrentSelection}
        theme={theme}
        toggleTheme={toggleTheme}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <main className="main-content">
        <Reader kanda={currentSelection.kanda} sarga={currentSelection.sarga} viewMode={viewMode} />
      </main>
    </div>
  )
}

export default App
