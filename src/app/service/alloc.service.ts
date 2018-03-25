import { Observable } from 'rxjs/Observable';
import { Allocation } from '@app/model/scrum';
import { RestClient } from '@service/rest.client';
import { sprintf } from 'sprintf-js';
import { ValidationResult } from '@app/model/validation';

const SERVICE_ALLOCATIONS = '/allocations';
const SERVICE_ALLOCATION = '/allocation';
const SERVICE_ALLOCATION_GET = SERVICE_ALLOCATION + '/%s,%s,%s,%s';
const SERVICE_ALLOCATION_REMOVE = SERVICE_ALLOCATION + '/%s,%s,%s,%s';
const SERVICE_ALLOCATION_VALIDATE = SERVICE_ALLOCATION + '/validate';

export class AllocService extends RestClient {
  public getAllocations(): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(RestClient.getApiUrl(SERVICE_ALLOCATIONS));
  }

  getAllocation(key: string, date: Date, group: string, employee: string): Observable<Allocation> {
    return this.http.get<Allocation>(RestClient.getApiUrl(sprintf(SERVICE_ALLOCATION_GET, key, date, group, employee)));
  }

  validateAllocation(alloc: Allocation): Observable<ValidationResult[]> {
    return this.http.post<ValidationResult[]>(RestClient.getApiUrl(SERVICE_ALLOCATION_VALIDATE), alloc);
  }

  removeAllocation(alloc: Allocation): Observable<number> {
    return this.http.delete<number>(RestClient.getApiUrl(sprintf(SERVICE_ALLOCATION_REMOVE,
      alloc.key, alloc.date, alloc.group, alloc.employee)));
  }

  upsertAllocation(alloc: Allocation): Observable<number> {
    return this.http.post<number>(RestClient.getApiUrl(SERVICE_ALLOCATION), alloc);
  }
}
