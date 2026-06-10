import fs from 'fs';
import { SongsterrToAlphaTabConverter } from './songsterr-to-alphatab.converter.js';

const [,, outputFile, ...jsonFiles] = process.argv;

const converter = new SongsterrToAlphaTabConverter();

const trackMetas = [];
const revisions = [];

jsonFiles.forEach((file, idx) => {
  const revision = JSON.parse(fs.readFileSync(file, 'utf8'));
  const meta = {
    partId: idx,
    instrumentId: revision.instrumentId ?? 27,
    title: revision.name ?? `Track ${idx}`,
    tuning: [64, 59, 55, 50, 45, 40]
  };
  trackMetas.push(meta);
  revisions.push({ trackMeta: meta, revision });
});

const meta = {
  songId: 1,
  revisionId: 1,
  image: "",
  title: "Combined Song",
  artist: "Unknown",
  tracks: trackMetas
};

const { data } = converter.toGp7({ meta, revisions });
fs.writeFileSync(outputFile, Buffer.from(data));

console.log("Combined GP7 saved to:", outputFile);