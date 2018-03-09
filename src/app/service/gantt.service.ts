import { Observable } from 'rxjs/Observable';
import { Task, Link } from '@app/model/gantt';
import { RestClient } from '@service/rest.client';

const SERVICE_GANTT_TASKS = '/gantt/tasks';
const SERVICE_GANTT_LINKS = '/gantt/links';

export class GanttService extends RestClient {
  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.getUrl(SERVICE_GANTT_TASKS));
  }

  public getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.getUrl(SERVICE_GANTT_LINKS));
  }
}
