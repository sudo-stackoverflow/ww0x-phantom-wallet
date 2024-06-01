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
                        copyToClipboard();
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
        }
    };

    const copyToClipboard = () => {
        const textArea = document.createElement('textarea');
        textArea.value = window.solana.publicKey.toString();
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        setTimeout(() => {
            try {
                document.execCommand('copy');
                alert('Address copied to clipboard! Go back to your game!');
            } catch (err) {
                alert('Failed to copy the address. Please try again.');
                console.error('Failed to copy: ', err);
            }
            document.body.removeChild(textArea);
        }, 100); // Add a slight delay
    };

    const openPhantomExtension = async () => {
        try {
            const connected = await window.solana.connect();
            if (connected) {
                setConnected(true);
                setPublicKey(window.solana.publicKey.toString());
                copyToClipboard();
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
                        <p className="connected-text">Connected to wallet address: <span
                            className="wallet-address">{publicKey}</span></p>
                        <div className="button-wrapper">
                            <button onClick={handleDisconnect} className="disconnect-btn">Disconnect</button>
                            {/*
                  <button onClick={copyToClipboard} className="copy-btn">Copy address to Clipboard</button>
*/}
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
