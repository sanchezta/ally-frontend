export interface User {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  lastLogin: string;
}

export interface UserApiResponse {
  data: User[];
  total: number;
  page: number;
  lastPage: number;
}