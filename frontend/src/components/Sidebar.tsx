import { Dispatch, SetStateAction } from "react";
import Block, { BlockData, BlockType } from "./Block";

interface SidebarProps {
  setBlocks: Dispatch<SetStateAction<BlockData[]>>;
  setGenerated: Dispatch<SetStateAction<boolean>>;
  generated: boolean;
}

const Sidebar = ({ setBlocks, setGenerated, generated }: SidebarProps) => {
  return (
    <div className="p-3 h-screen">
      <div className="p-3 text-center border border-slate-600 rounded-lg h-full shadow-lg bg-slate-600 flex flex-col justify-between">
        <div className="flex flex-col space-y-3">
          <Block
            title={BlockType.BaseImage}
            subtitle="Select a base image"
            setBlocks={setBlocks}
          />
          <Block
            title={BlockType.InstallPackages}
            subtitle="Add packages to your container"
            setBlocks={setBlocks}
          />
          <Block
            title={BlockType.EnvironmentVariables}
            subtitle="Set environment variables"
            setBlocks={setBlocks}
          />
          <Block
            title={BlockType.RunCommand}
            subtitle="Run a shell command"
            setBlocks={setBlocks}
          />
        </div>
        <button
          className="bg-slate-700 text-white p-3 rounded-lg hover:bg-slate-800"
          onClick={() => setGenerated((prev) => !prev)}
        >
          {generated ? "Edit" : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
