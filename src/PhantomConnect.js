import React, {useState, useEffect} from 'react';
import './PhantomConnect.css';

const PhantomConnect = () => {
    const [connected, setConnected] = useState(false);
    const [publicKey, setPublicKey] = useState('');

    useEffect(() => {
        const checkConnection = async () => {
            if (window.solana && window.solana.isPhantom) {
                try {
                    // Check if already connected
                    const existingConnection = await window.solana.isConnected;
                    if (existingConnection) {
                        setConnected(true);
                        setPublicKey(window.solana.publicKey.toString());
                    }
                } catch (error) {
                    console.error('Error checking Phantom wallet connection:', error);
                }
            } else {
                console.error('Phantom wallet not detected.');
            }
        };

        checkConnection();
    }, []);

    const handleDisconnect = async () => {
        if (window.solana) {
            try {
                await window.solana.disconnect();
                setConnected(false);
                setPublicKey('');
            } catch (error) {
                console.error('Error disconnecting Phantom wallet:', error);
            }
        }
    };

    const copyToClipboard = (address) => {
        const textArea = document.createElement('textarea');
        textArea.value = address;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            alert('Address copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy address:', err);
            alert('Failed to copy the address. Please try again.');
        } finally {
            document.body.removeChild(textArea);
        }
    };

    const openPhantomExtension = async () => {
        if (window.solana && window.solana.isPhantom) {
            try {
                const connection = await window.solana.connect();
                setConnected(true);
                const address = connection.publicKey.toString();
                setPublicKey(address);
                copyToClipboard(address); // Ensure the address is copied on connection
            } catch (error) {
                console.error('Error connecting to Phantom wallet:', error);
            }
        } else {
            console.error('Phantom wallet not detected.');
        }
    };

    const handleCopyAddress = () => {
        if (publicKey) {
            copyToClipboard(publicKey);
        } else {
            console.error('No wallet address to copy.');
        }
    };

    return (<div>
            <div className="phantom-connect">
                {connected ? (<div>
                        <p className="connected-text">
                            Connected to wallet address: <span className="wallet-address">{publicKey}</span>
                        </p>
                        <div className="button-wrapper">
                            <button onClick={handleDisconnect} className="disconnect-btn">Disconnect</button>
                            {/*
                           // <button onClick={handleCopyAddress} className="copy-btn">Copy Address to Clipboard</button>
*/}
                        </div>

                        <p className="connected-message">
                            YOU CAN GO BACK TO GAME!
                        </p>

                    </div>) : (<button onClick={openPhantomExtension} className="connect-btn">
                        Connect to Phantom Wallet
                    </button>)}
            </div>
        </div>);
};

export default PhantomConnect;
