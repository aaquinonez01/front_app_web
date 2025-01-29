export interface PersonalResponse {
  data: User[];
  meta: Meta;
}

export interface User {
  id?: string;
  email: string;
  password: string;
  username: string;
  isActive: boolean;
  userInformation: UserInformation;
  userRoles: UserRole[];
}

export interface UserInformation {
  id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export interface UserRole {
  role: Role;
}

export interface Role {
  name: string;
}

export interface Meta {
  page: number;
  limit: number;
  totalPages: number;
}
