import { useState } from "react";
import { BottomTabs, type TabKey } from "./components/BottomTabs";
import SavedNumbersScreen from "./screens/SavedNumbersScreen";
import LottoWinnerScreen from "./screens/LottoWinnerScreen.tsx";
import CameraScreen from "./screens/CameraScreen";

function App() {
  const [selectedTab, setSelectedTab] = useState<TabKey>("saved");

  return (
    <div className="min-h-screen pb-16 bg-gray-50 relative">
      {/* 메인 내용 */}
      <main>
        {selectedTab === "saved" && <SavedNumbersScreen />}
        {selectedTab === "winner" && <LottoWinnerScreen />}
        {selectedTab === "camera" && <CameraScreen />}
      </main>
      {/* 하단 탭 */}
      <BottomTabs selected={selectedTab} onSelect={setSelectedTab} />
    </div>
  );
}

export default App;
