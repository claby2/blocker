import { useDrop } from "react-dnd";
import { BlockData } from "./Block";
import InteractiveBlock from "./InteractiveBlock";

interface CanvasProps {
  blocks: BlockData[];
}

const Canvas = ({ blocks }: CanvasProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "block",
    drop: () => ({ name: "Canvas" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div className="p-3 h-screen">
      <div
        ref={drop}
        className="p-3 border border-slate-600 rounded-lg h-full shadow-lg bg-slate-600 flex flex-col space-y-3"
      >
        {blocks.map((block, index) => (
          <InteractiveBlock key={index} data={block} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
