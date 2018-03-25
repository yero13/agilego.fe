import { Observable } from 'rxjs/Observable';
import { Discrepency, StatusDate } from '@app/model/status';
import { RestClient } from '@service/rest.client';

const SERVICE_STATUS = '/plan-vs-actual';
const SERVICE_STATUS_DATE = SERVICE_STATUS + '/date';
const SERVICE_STATUS_DISCREPENCIES = SERVICE_STATUS + '/discrepencies';

export class StatusService extends RestClient {
  public getDiscrepencies(): Observable<Discrepency[]> {
    return this.http.get<Discrepency[]>(RestClient.getApiUrl(SERVICE_STATUS_DISCREPENCIES));
  }

  public getStatusDate(): Observable<StatusDate> {
    return this.http.get<StatusDate>(RestClient.getApiUrl(SERVICE_STATUS_DATE));
  }
}
