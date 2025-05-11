export interface Group {
  _id?: string;
  name: string;
  description?: string;
  isListed: boolean;
}

export interface GetGroupsParams {
  search?: string;
  isListed?: boolean;
  page?: number;
  limit?: number;
}
