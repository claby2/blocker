import { useEffect, useState } from "react";
import { BlockData } from "./Block";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface PreviewProps {
  blocks: BlockData[];
}

const submit = async (blocks: BlockData[]): Promise<string> => {
  const response = await fetch("http://127.0.0.1:8000/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base_image: {
        type: blocks[0].type,
        data: blocks[0].data,
      },
      blocks: blocks.slice(1).map((block) => ({
        type: block.type,
        data: block.data,
      })),
    }),
  });

  return response.text();
};

const Preview = ({ blocks }: PreviewProps) => {
  const [dockerfile, setDockerfile] = useState("");
  useEffect(() => {
    const submitBlocks = async () => {
      setDockerfile(await submit(blocks));
    };
    submitBlocks();
  }, []);
  return (
    <div className="p-3 h-screen">
      <div className="p-3 border border-slate-600 rounded-lg h-full shadow-lg bg-slate-600 flex flex-col space-y-3 overflow-y-scroll">
        <SyntaxHighlighter
          language="docker"
          style={gruvboxDark}
          className="rounded"
        >
          {dockerfile}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Preview;
