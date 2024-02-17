import { Dispatch, SetStateAction } from "react";
import { useDrag } from "react-dnd";

export enum BlockType {
  BaseImage = "Base Image",
  InstallPackages = "Install Packages",
  EnvironmentVariables = "Environment Variables",
  RunCommand = "Run Command",
}

export interface BlockData {
  type: BlockType;
  subtitle: string;
  data: string;
}

interface BlockProps {
  title: BlockType;
  subtitle?: string;
  setBlocks: Dispatch<SetStateAction<BlockData[]>>;
}

const Block = ({ title, subtitle, setBlocks }: BlockProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "block",
    item: { type: title, subtitle },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        setBlocks((prev) => [
          ...prev,
          {
            type: item.type,
            subtitle: item.subtitle,
            data: "",
          } as BlockData,
        ]);
      }
    },
  }));

  return (
    <div
      ref={drag}
      className="p-3 border border-slate-900 border-primary cursor-pointer rounded-lg bg-slate-900 text-white text-left"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <p className="text-white text-base font-medium tracking-tight">{title}</p>
      <p className="text-slate-400 text-sm tracking-tight">{subtitle}</p>
    </div>
  );
};

export default Block;
