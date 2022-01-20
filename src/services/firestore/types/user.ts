export interface IUser {
  id: string;
  name: string | null;
  description: string;
  photoUrl: string | null;
  phoneNumber: null;
  status: IStatus;
  formatted_city: string;
  base_at_skate_type: string[]
}

export enum IStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  PENDING = 2,
}
