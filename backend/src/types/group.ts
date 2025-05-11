export interface Group {
  _id?: string;
  name: string;
  description?: string;
  isListed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
