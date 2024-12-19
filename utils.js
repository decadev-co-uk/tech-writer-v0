class TextChunker {
    /**
     * Recursively split text into chunks
     * @param {string} text - Full text to be chunked
     * @param {Object} options - Chunking configuration
     * @returns {string[]} Array of text chunks
     */
    static recursiveChunk(text, options = {}) {
      const {
        chunkSize = 1000,
        chunkOverlap = 200,
        separators = ['\n\n', '\n', ' ', '']
      } = options;

      if (separators.length === 0 || text.length <= chunkSize) {
        return [text];
      }
  
      const separator = separators[0];
      const chunks = [];
      const splits = text.split(separator);
  
      let currentChunk = '';
      for (const split of splits) {
        if ((currentChunk + separator + split).length > chunkSize) {
          if (currentChunk) {
            chunks.push(currentChunk);
            currentChunk = currentChunk.slice(-chunkOverlap) + separator + split;
          } else {
            return this.recursiveChunk(text, { 
              ...options, 
              separators: separators.slice(1) 
            });
          }
        } else {
          currentChunk = currentChunk 
            ? currentChunk + separator + split 
            : split;
        }
      }

      if (currentChunk) {
        chunks.push(currentChunk);
      }
  
      return chunks;
    }
  }
  
  module.exports = TextChunker;
