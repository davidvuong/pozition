import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ConnectWalletProvider } from './context/useConnectWalletContext';
import { ContractProvider } from './context/useContract';

ReactDOM.render(
  <BrowserRouter>
    <ConnectWalletProvider>
      <ContractProvider>
        <App />
      </ContractProvider>
    </ConnectWalletProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
