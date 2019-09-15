export interface PersonalData {
  id?: number,
  email?: string,
  password?: string,
  role?: number,
  name?: string,
  firstLogin?: number,
  lastLogin?: number,
  banned?: number,
  activated?: number,
  checked?: number
}

export interface PasswordData {
  id?: number;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
}
