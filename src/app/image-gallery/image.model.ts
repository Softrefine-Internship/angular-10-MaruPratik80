export interface Image {
  id: number;
  url: string;
  name: string;
  size: number;
  uploadDate: Date;
  modifiedDate: Date;
  tags: string[];
}
