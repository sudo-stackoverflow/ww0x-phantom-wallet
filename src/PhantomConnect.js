// PhantomConnect.js
import React, { useState, useEffect } from 'react';
import './PhantomConnect.css'; // Import the CSS file for styling

const PhantomConnect = () => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      if (window.solana) {
        try {
          const connected = await window.solana.connect();
          if (connected) {
            setConnected(true);
            setPublicKey(window.solana.publicKey.toString());
          }
        } catch (error) {
          console.error('Error connecting to Phantom wallet:', error);
        }
      } else {
        console.error('Phantom wallet not detected.');
      }
    };

    checkConnection();
  }, []);

  const handleDisconnect = () => {
    if (window.solana) {
      window.solana.disconnect();
      setConnected(false);
      setPublicKey('');
      navigator.clipboard.writeText('').then(() => {
        // Success callback if needed
      }).catch((error) => {
        // Error handling if needed
      });    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey).then(() => {
      alert('Address copied to clipboard! Go back to your game!');
    }).catch((error) => {
      console.error('Error copying address to clipboard');
    });
  };

  const openPhantomExtension = async () => {
    try {
      const connected = await window.solana.connect();
      if (connected) {
        setConnected(true);
        setPublicKey(window.solana.publicKey.toString());
      }
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error);
    }
  };

  return (
      <div>
        <div className="phantom-connect">
          {connected ? (
              <div>
                <p className="connected-text">Connected to wallet address: <span className="wallet-address">{publicKey}</span></p>
                <div className="button-wrapper">
                  <button onClick={handleDisconnect} className="disconnect-btn">Disconnect</button>
                  <button onClick={copyToClipboard} className="copy-btn">Copy address to Clipboard</button>
                </div>
              </div>
          ) : (
              <button onClick={openPhantomExtension} className="connect-btn">Connect to Phantom Wallet</button>
          )}
        </div>
      </div>
  );
};

export default PhantomConnect;
