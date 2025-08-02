import React from 'react';
import { useState } from 'react';
import { useApiKey } from '../../contexts/ApiKeyContext';
import { Button } from '../ui/button';

export const ApiKeyLoginPage = () => {
  const { setApiKey } = useApiKey();
  const [inputKey, setInputKey] = useState('');

  // State to manage button text
  const [buttonText, setButtonText] = useState('Save and Enter!');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogin = () => {
    setIsAnimating(true);

    if (inputKey.startsWith('sk-')) {
      setApiKey(inputKey);
      setIsDisabled(true);
      setButtonText('Saving...');
    } else {
      setIsDisabled(true);
      setButtonText('❌ Invalid API Key');
    }

    // After 2 seconds, revert back
    setTimeout(() => {
      setButtonText('Save and Try Again');
      setIsDisabled(false);
      setIsAnimating(false);
    }, 700);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Meow Your Own OpenAI API Key</h2>
        <input
          type="password"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="sk-..."
          className="w-full p-2 border rounded mb-4"
        />
        <Button 
          onClick={handleLogin}
          disabled={isDisabled}
          variant="default_cat" 
          className="w-full" type="submit" value="Send">
            <span 
            className={`inline-block transition-all duration-300 ease-in-out 
              ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            }`}>
            {buttonText}</span>
        </Button>
      </div>
    </div>
  );
};
