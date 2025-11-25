import { useState } from 'react';
import { type TabType } from './types/lottery';
import { BottomTabs } from './components/BottomTabs';
import { SavedNumbersScreen } from './screens/SavedNumbersScreen';
import { WinnerScreen } from './screens/WinnerScreen';
import { CameraScreen } from './screens/CameraScreen';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('saved');

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === 'saved' && <SavedNumbersScreen />}
        {activeTab === 'winner' && <WinnerScreen />}
        {activeTab === 'camera' && <CameraScreen />}
      </div>
      <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
