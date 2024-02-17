import { BlockData } from "./Block";

interface InteractiveBlockProps {
  data: BlockData;
}

const InteractiveBlock = ({ data }: InteractiveBlockProps) => {
  return (
    <div className="p-3 border border-slate-900 border-primary cursor-pointer rounded-lg bg-slate-900 text-white text-left">
      <p className="text-white text-base font-medium tracking-tight">
        {data.type}
      </p>
      <p className="text-slate-400 text-sm tracking-tight">{data.subtitle}</p>
      <input className="p-2 mt-2 w-full bg-slate-700 rounded-lg" />
    </div>
  );
};

export default InteractiveBlock;
