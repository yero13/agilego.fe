import { Observable } from 'rxjs/Observable';
import { Employee, Group } from '@app/model/staff';
import { RestClient } from '@service/rest.client';

const SERVICE_TEAM = '/team';

export class StaffService extends RestClient {
  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.getUrl(SERVICE_TEAM));
  }
}
