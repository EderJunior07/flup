export interface IUser {
  id: string;
  name: string | null;
  description: string;
  photoUrl: string | null;
  phoneNumber: null;
  status: IStatus;
  formatted_city: string;
}

export enum IStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  PENDING = 2,
}
