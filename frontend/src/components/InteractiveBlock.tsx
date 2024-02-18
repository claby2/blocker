import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";
import { BlockData, BlockTypeToIcon } from "./Block";
import { Dispatch, SetStateAction, useRef } from "react";

interface InteractiveBlockProps {
  index: number;
  data: BlockData;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  setBlocks: Dispatch<SetStateAction<BlockData[]>>;
}

interface DragItem {
  index: number;
  data: BlockData;
}

const InteractiveBlock = ({
  index,
  data,
  moveBlock,
  setBlocks,
}: InteractiveBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "interactive-block",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveBlock(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "interactive-block",
    item: () => {
      return { index, data } as DragItem;
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
      className="p-3 border border-slate-900 border-primary cursor-pointer rounded-lg bg-slate-900 text-white text-left"
    >
      <div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6">{BlockTypeToIcon(data.type)}</div>
          <p className="text-white text-base font-medium tracking-tight">
            {data.type}
          </p>
        </div>
      </div>
      <p className="text-slate-400 text-sm tracking-tight">{data.subtitle}</p>
      <input
        type="text"
        className="p-2 mt-2 w-full bg-slate-700 rounded-lg"
        value={data.data}
        onChange={(e) => {
          setBlocks((prev) => {
            const newBlocks = [...prev];
            newBlocks[index].data = e.target.value;
            return newBlocks;
          });
        }}
      />
    </div>
  );
};

export default InteractiveBlock;
