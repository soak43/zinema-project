import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Settings from './settings';
import SettingsMain from './settings/settings';
import Billing from './settings/billing';
import Security from './settings/security';
import ViewCard from './settings/view-card';
import AddCard from './settings/add-card';
import PayBill from './settings/pay-bill';

function App() {
  return (
      <div className="App">
        <div>
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings-main" element={<SettingsMain />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/security" element={<Security />} />
            <Route path="/*" element={<Settings />} />
            <Route path="/view-card"    element={<ViewCard />} />
            <Route path="/add-card" element={<AddCard />} />
            <Route path="/pay-bill"  element={<PayBill />} /> 
          </Routes>
        </div>
      </div>
  );
}

export default App;
