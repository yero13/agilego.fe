import { Observable } from 'rxjs/Observable';
import { Sprint } from '@app/model/scrum';
import { RestClient } from '@service/rest.client';


const SERVICE_SPRINT = '/sprint';
const SERVICE_SPRINT_TIMELINE = SERVICE_SPRINT + '/timeline';

export class SprintService extends RestClient {
  public getSprint(): Observable<Sprint> {
    return this.http.get<Sprint>(this.getUrl(SERVICE_SPRINT));
  }

  public getSprintTimeline(): Observable<Date[]> {
    return this.http.get<Date[]>(this.getUrl(SERVICE_SPRINT_TIMELINE));
  }
}
