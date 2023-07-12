import NodeCache from 'node-cache';
const TTL = 60 * 2; // seconds
const cacheLayer = new NodeCache({ stdTTL: TTL });

export default cacheLayer;
