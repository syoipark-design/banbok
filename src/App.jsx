import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TransferProvider } from './context/TransferContext';
import Home from './screens/Home';
import FrequentSave from './screens/FrequentSave';
import TransferPurpose from './screens/TransferPurpose';
import TransferAmount from './screens/TransferAmount';
import TransferComplete from './screens/TransferComplete';

export default function App() {
  return (
    <TransferProvider>
      <div style={{ width: 375, height: 812, overflow: 'hidden', position: 'relative' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/transfer/new" element={<FrequentSave />} />
            <Route path="/transfer/purpose" element={<TransferPurpose />} />
            <Route path="/transfer/amount" element={<TransferAmount />} />
            <Route path="/transfer/complete" element={<TransferComplete />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TransferProvider>
  );
}
