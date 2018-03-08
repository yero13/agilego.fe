import { Observable } from 'rxjs/Observable';
import { BacklogItem } from '@app/model/scrum';
import { RestClient } from '@service/rest.client';

const SERVICE_BACKLOG = '/backlog';

export class BacklogService extends RestClient {
  public getBacklog(): Observable<BacklogItem[]> {
    return this.http.get<BacklogItem[]>(this.getUrl(SERVICE_BACKLOG));
  }
}
