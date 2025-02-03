export interface Personalregister {
  createUser: CreateUser;
  createMedic: CreateMedic;
}

export interface CreateMedic {
  firstname: string;
  lastname: string;
  dni: string;
  specialty: string;
  address: string;
  phone: string;
}

export interface CreateUser {
  email: string;
  username: string;
  userInformation: UserInformation;
}

export interface UserInformation {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
}
