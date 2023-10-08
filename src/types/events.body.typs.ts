export type EventTypes = "Online" | "FaceToFace";

export interface IRequestEventBody {
  title?: string;
  code: string;
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
  code: string;
  description: string;
  location?: string;
  start_date: string;
  end_date?: string;
  type: EventTypes;
  url?: string;
  purchase_link?: string;
  categories: string[];
  organiserId: string;
}
