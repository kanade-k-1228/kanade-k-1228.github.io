import sharp from "sharp";
import { type CoverInputs, renderCoverSvg } from "./render-svg";

export const renderCoverPng = async (input: CoverInputs): Promise<Buffer> => {
  const svg = renderCoverSvg(input);
  return await sharp(Buffer.from(svg, "utf8")).png({ compressionLevel: 9 }).toBuffer();
};
