
import { useState } from "react";
import Header from "./components/Header"; 
import TaskCount from "./components/TaskCount";
import useLocalStorage from 'use-local-storage';
import TodoApp from "./components/TodoList";
import "./style.css";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Home() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className="app" data-theme={theme}>
      <div className='todo'>
        <div className='wrapper'>
          <Header/>
          <TodoApp />
        </div>
        <div className='theme-toggle'>
          {theme === 'light' ? (
            <DarkModeIcon onClick={switchTheme} />
          ) : (
            <WbSunnyIcon onClick={switchTheme} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
