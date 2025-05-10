export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface PaginatedData<T> {
  data: T[];
  total: number;
}
