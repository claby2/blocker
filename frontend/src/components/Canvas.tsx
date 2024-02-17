import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { BlockData } from "./Block";
import InteractiveBlock from "./InteractiveBlock";
import { Dispatch, SetStateAction, useCallback } from "react";

interface CanvasProps {
  blocks: BlockData[];
  setBlocks: Dispatch<SetStateAction<BlockData[]>>;
}

const Canvas = ({ blocks, setBlocks }: CanvasProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "block",
    drop: () => ({ name: "Canvas" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const moveBlock = useCallback((dragIndex: number, hoverIndex: number) => {
    setBlocks((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      }),
    );
  }, []);

  return (
    <div className="p-3 h-screen">
      <div
        ref={drop}
        className="p-3 border border-slate-600 rounded-lg h-full shadow-lg bg-slate-600 flex flex-col space-y-3 overflow-y-scroll"
      >
        {blocks
          .filter((block) => block)
          .map((block, index) => (
            <InteractiveBlock
              index={index}
              key={index}
              data={block}
              moveBlock={moveBlock}
            />
          ))}
      </div>
    </div>
  );
};

export default Canvas;
