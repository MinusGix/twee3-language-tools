import { RawPassage, Passage, Vector, LinkedPassage } from '../types';

export const parseRaw = (passageIn: RawPassage): Passage => {
  const lastIndex = passageIn.origin.path.lastIndexOf('/');
  const meta = passageIn.meta || {};
  const positionArr = (meta.position || '0,0').split(',').map((str: string) => parseFloat(str));
  const sizeArr = (meta.size || '100,100').split(',').map((str: string) => parseFloat(str));
  const position: Vector = {
    x: Math.round(Math.max(0, positionArr[0])),
    y: Math.round(Math.max(0, positionArr[1])),
  };
  const size: Vector = { x: sizeArr[0], y: sizeArr[1] };
  return {
    origin: passageIn.origin,
    range: passageIn.range,
	stringRange: passageIn.stringRange,
    filename: passageIn.origin.path.substring(lastIndex + 1),
    path: passageIn.origin.path.substring(0, lastIndex),
    name: passageIn.name,
    tags: passageIn.tags,
    linksToNames: passageIn.linksToNames,
    position: position,
    size: size,
    drawPosition: null,
    originalPosition: { ...position },
    originalSize: { ...size },
    originalTags: [...passageIn.tags],
    key: `passage-${passageIn.origin}-${passageIn.name}`,
  };
};

export const linkPassage = (passage: Passage, allPassages: Passage[]): LinkedPassage => {
  return Object.assign(passage, {
    linksTo: allPassages.filter((otherPassage) => passage.linksToNames.includes(otherPassage.name)),
    linkedFrom: allPassages.filter((otherPassage) => otherPassage.linksToNames.includes(passage.name)),
  });
}