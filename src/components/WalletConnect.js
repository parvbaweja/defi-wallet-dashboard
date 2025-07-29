import { useState } from 'react';
import { ethers } from 'ethers';

export default function WalletConnect() {
  const [account, setAccount] = useState(null);
  const [balances, setBalances] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);

      // Mock token balances
      setBalances([
        { symbol: 'ETH', balance: '1.23' },
        { symbol: 'DAI', balance: '540.00' },
        { symbol: 'USDC', balance: '305.45' },
      ]);

      // Mock recent transactions
      setTransactions([
        {
          hash: '0xabc123',
          to: '0xD1...34Fb',
          amount: '0.5 ETH',
          status: 'Success',
        },
        {
          hash: '0xdef456',
          to: '0xE4...78Bc',
          amount: '250 USDC',
          status: 'Pending',
        },
      ]);
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>

      {account && (
        <div>
          <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>

          {balances.length > 0 && (
            <div>
              <h2>Token Balances:</h2>
              <ul>
                {balances.map((b, i) => (
                  <li key={i}>{b.symbol}: {b.balance}</li>
                ))}
              </ul>
            </div>
          )}

          {transactions.length > 0 && (
            <div>
              <h2>Recent Transactions:</h2>
              <ul>
                {transactions.map((tx, i) => (
                  <li key={i}>
                    To: {tx.to} — {tx.amount} — {tx.status} <br />
                    <small>Txn: <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">{tx.hash.slice(0, 10)}...</a></small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
