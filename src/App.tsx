import Header from './components/ui/header';
import './styles/App.css';
import { ThemeProvider } from './components/theme-provider';
import Leaderboard from './components/ui/leaderboard';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <div className='bg-white dark:bg-[#1B2126]'>
          <div className='container-common'>
            <Header />
            <Leaderboard />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
