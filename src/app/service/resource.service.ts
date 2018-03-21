import { Observable } from 'rxjs/Observable';
import { RestClient } from '@service/rest.client';
import { Employee } from '@app/model/team';

const SERVICE_COMPONENTS = '/components';
const SERVICE_EMPLOYEES = '/employees';

export class ResourceService extends RestClient {
  public getComponents(): Observable<string[]> {
    return this.http.get<string[]>(RestClient.getApiUrl(SERVICE_COMPONENTS));
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(RestClient.getApiUrl(SERVICE_EMPLOYEES));
  }
}
