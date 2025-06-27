export interface TimelineImage {
  url: string;
  caption: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  fullDescription: string;
  severity: 'medium' | 'high' | 'critical';
  images?: TimelineImage[];
}

export type ViewType = 'timeline' | 'summary';
