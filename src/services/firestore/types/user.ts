export interface IUser {
  id: string;
  name: string | null;
  description: string;
  photoUrl: string;
  phoneNumber: null;
  status: IStatus;
  formatted_city: string;
  base_at_skate_type: IBaseType[]
}

export interface IBaseType {
  id: string,
  providerId: string,
}

export enum IStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  PENDING = 2,
}
