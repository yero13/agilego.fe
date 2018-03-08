import { Observable } from 'rxjs/Observable';
import { Allocation } from '@app/model/scrum';
import { RestClient } from '@service/rest.client';
import { sprintf, vsprintf } from 'sprintf-js';
import { ValidationResult } from '@app/model/validation';

const SERVICE_ALLOCATIONS = '/assignments';
const SERVICE_ALLOCATION = '/assignment';
const SERVICE_ALLOCATION_GET = SERVICE_ALLOCATION + '/%s,%s,%s,%s';
const SERVICE_ALLOCATION_REMOVE = SERVICE_ALLOCATION + '/%s,%s,%s,%s';
const SERVICE_ALLOCATION_VALIDATE = SERVICE_ALLOCATION + '/validate';

export class AllocService extends RestClient {
  public getAllocations(): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(this.getUrl(SERVICE_ALLOCATIONS));
  }

  getAssignment(key: string, date: Date, group: string, employee: string): Observable<Allocation> {
    return this.http.get<Allocation>(this.getUrl(sprintf(SERVICE_ALLOCATION_GET, key, date, group, employee)));
  }

  validateAllocation(allocation: Allocation): Observable<ValidationResult[]> {
    return this.http.post<ValidationResult[]>(this.getUrl(SERVICE_ALLOCATION_VALIDATE), allocation);
  }
/*
  upsertAssignment(assignment: Allocation): Promise<number> {
    return this.http.post(this.getUrl(SERVICE_ALLOCATION), assignment, this.options)
      .toPromise()
      .then(response => response.json() || {})
      .catch(error => console.error(error));
  }

  removeAssignment(assignment_params: Allocation): Promise<number> {
    return this.http.delete(this.getUrl(sprintf(SERVICE_ALLOCATION_REMOVE, assignment_params.key,
      assignment_params.date, assignment_params.group, assignment_params.employee)), this.options)
      .toPromise()
      .then(response => response.json() || {})
      .catch(error => console.error(error));
  }

*/
}
