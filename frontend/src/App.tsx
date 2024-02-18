import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import { useState } from "react";
import { BlockData, BlockType } from "./components/Block";

function App() {
  const [blocks, setBlocks] = useState<BlockData[]>([
    {
      type: BlockType.BaseImage,
      subtitle: "Select a base image",
      data: "debian"
    }
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex bg-gradient-to-r from-slate-700 to-slate-800">
        <div className="w-1/4 h-screen">
          <Sidebar setBlocks={setBlocks} />
        </div>
        <div className="w-3/4 h-screen">
          <Canvas setBlocks={setBlocks} blocks={blocks} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
