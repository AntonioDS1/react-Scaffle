import { chunk } from 'lodash';
export const splitInChunks = (options, chunkIndex = null, chunkNum = 8) => {
  if (!chunkIndex) return chunk(options, chunkNum);
  return chunk(options, chunkNum)[chunkIndex - 1];
};
