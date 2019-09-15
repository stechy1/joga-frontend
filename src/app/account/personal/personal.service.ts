import { Injectable } from '@angular/core';
import { BASE_ACCOUNT_API } from '../account.share';
import { HttpClient } from '@angular/common/http';
import { PasswordData, PersonalData } from './personalData';
import { AuthService } from '../../auth/auth.service';
import { objectToFormData } from '../../share/general-utils';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private static readonly ACCESS_POINT = `${BASE_ACCOUNT_API}/personal`;
  private static readonly UPDATE_PASSWORD = `${PersonalService.ACCESS_POINT}/update_password`;
  private static readonly DISABLE_ACCOUNT = `${PersonalService.ACCESS_POINT}/disable_account`;


  constructor(private _auth: AuthService, private _http: HttpClient) { }

  dataForLoggedUser(): Promise<PersonalData> {
    return this.byId(+this._auth.user.getValue().id);
  }

  byId(id: number): Promise<PersonalData> {
    const url = `${PersonalService.ACCESS_POINT}/${id}`;
    return this._http.get<{personalData: PersonalData}>(url)
               .toPromise()
               .then(result => {
                 console.log(result.personalData);
                 return result.personalData;
               });
  }

  updatePersonalInformations(data: PersonalData): Promise<PersonalData> {
    const formData = new FormData();
    formData.append('id', `${data.id}`);
    formData.append('name', data.name);
    formData.append('password', data.password);

    return this._http.post<{personalData: PersonalData}>(PersonalService.ACCESS_POINT, formData)
               .toPromise()
               .then(result => {
                 return result.personalData;
               });
  }

  updatePassword(data: PasswordData): Promise<any> {
    const formData = objectToFormData(data);

    return this._http.post(PersonalService.UPDATE_PASSWORD, formData)
               .toPromise();
  }

  disableAccount(password: string): Promise<any> {
    const formData = new FormData();
    formData.append('password', password);

    return this._http.post(PersonalService.DISABLE_ACCOUNT, formData).toPromise();

  }

}
