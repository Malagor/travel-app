export type TPointInfo = {
  xid?: string;
  name?: string;
  kinds?: string;
  osm?: string;
  wikidata?: string;
  // rate?: any;
  image?: string;
  preview?: {
    description?: string;
    source?: string;
    width?: number;
    height?: number;
  };
  wikipedia?: string;
  wikipedia_extracts?: {
    description: string;
    title: string;
    text: string;
    html: string;
  };
  voyage?: string;
  url?: string;
  otm?: string;
  // sources?: any;
  // info?: any;
  // bbox?: any;
  // point?: any;
};
