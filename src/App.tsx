import './App.css'
import Chatbot from './components/pages/Chatbot'
import { ApiKeyProvider, useApiKey } from '././contexts/ApiKeyContext';
import { ApiKeyLoginPage } from './components/pages/ApiKeyLoginPage';


function App() {

  const AppContent = () => {
    const { apiKey } = useApiKey();

    if (!apiKey) {
      return <ApiKeyLoginPage />;
    }

    return(
    <div 
      className='flex flex-col items-center justify-center h-screen
      bg-gradient-to-r from-orange-200 to-orange-100'>
        <Chatbot />
    </div>);
  };

  return (
    <ApiKeyProvider>
      <AppContent />
    </ApiKeyProvider>
  )
}

export default App
