import { Observable } from 'rxjs/Observable';
import { RestClient } from '@service/rest.client';

const SERVICE_COMPONENTS = '/components';
const SERVICE_EMPLOYEES = '/employees';

export class ResourceService extends RestClient {
  public getComponents(): Observable<string[]> {
    return this.http.get<string[]>(this.getUrl(SERVICE_COMPONENTS));
  }
}
