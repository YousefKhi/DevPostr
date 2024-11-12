import React, { useState } from 'react';
import axios from 'axios';

export default function LinkAccountsButton({ primaryUserId, secondaryUserToken }) {
  const [linking, setLinking] = useState(false);
  const [message, setMessage] = useState('');

  const handleLinkAccounts = async () => {
    setLinking(true);
    try {
      const response = await axios.post('/api/auth/linkAccounts', {
        primaryUserId,
        secondaryUserToken,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Failed to link accounts:', error);
      setMessage('Failed to link accounts');
    } finally {
      setLinking(false);
    }
  };

  return (
    <div>
      <button onClick={handleLinkAccounts} disabled={linking}>
        {linking ? 'Linking...' : 'Link Accounts'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
