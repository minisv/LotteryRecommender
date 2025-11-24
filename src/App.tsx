import { useState } from 'react';
import { BottomTabs } from './components/BottomTabs';
import { SavedNumbersScreen } from './components/screens/SavedNumbersScreen';
import { WinnerScreen } from './components/screens/WinnerScreen';
import { CameraScreen } from './components/screens/CameraScreen';
import { type TabKey } from './types/lottery';

function App() {
  const [selectedTab, setSelectedTab] = useState<TabKey>('saved');

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {selectedTab === 'saved' && <SavedNumbersScreen />}
        {selectedTab === 'winner' && <WinnerScreen />}
        {selectedTab === 'camera' && <CameraScreen />}
      </div>
      <BottomTabs selected={selectedTab} onSelect={setSelectedTab} />
    </div>
  );
}

export default App;