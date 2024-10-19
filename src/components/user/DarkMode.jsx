import React, { useEffect, useState } from 'react'

export const DarkMode = () => {

    const [isDarkMode, setisDarkMode] = useState(false)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setisDarkMode(savedDarkMode);
    }, []);

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const toggleMode = () => {
        setisDarkMode(!isDarkMode);
    }

  return (
    <div>
      <button className="btn btn-ghost btn-md" onClick={toggleMode}>
        {isDarkMode ? 'LightTheme' : 'DarkTheme'}
      </button>
    </div>
  )
}

