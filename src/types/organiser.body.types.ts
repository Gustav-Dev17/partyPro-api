export type DocumentTypes = "CPF" | "CNPJ";

export interface IRequestOrganiserBody {
  name?: string;
  email?: string;
  password?: string;
  id_document?: DocumentTypes;
  id_document_number?: string;
  phone?: string;
  instagram_url?: string;
  avatar_url?: string;
  reset_token?: string;
}

export interface IOrganiser {
  name: string;
  email: string;
  password: string;
  id_document: DocumentTypes;
  id_document_number: string;
  phone: string;
  instagram_url?: string;
  reset_token?: string;
}

export interface IOrganiserUpdate {
  name?: string;
  email?: string;
  password?: string;
  id_document?: DocumentTypes;
  id_document_number?: string;
  phone?: string;
  instagram_url?: string;
  avatar_url?: string;
  reset_token?: string;
}

