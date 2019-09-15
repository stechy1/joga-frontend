import { PasswordData, PersonalData } from './personalData';

export function formToPersonalData(formData: any): PersonalData {
  return {
    id: formData.personalId,
    name: formData.personalName,
    password: formData.personalPassword
  };

}

export function formToPasswordData(formData: any): PasswordData {
  return {
    id: formData.passwordId,
    oldPassword: formData.passwordOldPassword,
    newPassword: formData.passwordNewPassword,
    newPassword2: formData.passwordNewPassword2
  }
}
