import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface ApiKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKeyState] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem('openai-api-key');
    if (storedKey) {
      setApiKeyState(storedKey);
    }
  }, []);

  const setApiKey = (key: string) => {
    localStorage.setItem('openai-api-key', key);
    setApiKeyState(key);
  };

  const clearApiKey = () => {
    localStorage.removeItem('openai-api-key');
    setApiKeyState(null);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey, clearApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKey must be used within ApiKeyProvider');
  }
  return context;
};
