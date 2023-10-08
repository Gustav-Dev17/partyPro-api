export type EventTypes = "Online" | "FaceToFace";

export interface IRequestEventBody {
  title?: string;
  description?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  purchase_link?: string;
  type?: EventTypes;
  url?: string;
  categories?: string[];
  organiserId?: string;
}

export interface IEvent {
  title: string;
  description: string;
  location?: string;
  start_date: string;
  end_date?: string;
  purchase_link?: string;
  type: EventTypes;
  url?: string;
  categories: string[];
  organiserId: string;
}
