import { Observable } from 'rxjs/Observable';
import { sprintf } from 'sprintf-js';
import { Group } from '@app/model/team';
import { RestClient } from '@service/rest.client';

const SERVICE_TEAM = '/team';
const SERVICE_GROUP = '/group';
const SERVICE_GROUP_REMOVE = SERVICE_GROUP + '/%s';
const SERVICE_GROUP_UPDATE = SERVICE_GROUP + '/%s';

export class TeamService extends RestClient {
  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(RestClient.getApiUrl(SERVICE_TEAM));
  }

  removeGroup(group: Group): Observable<number> {
    return this.http.delete<number>(RestClient.getApiUrl(sprintf(SERVICE_GROUP_REMOVE, group.group)));
  }

  insertGroup(group: Group): Observable<number> {
    group.group = group.group.trim().toUpperCase();
    return this.http.post<number>(RestClient.getApiUrl(SERVICE_GROUP), group);
  }

  updateGroup(group: Group, group_name: string): Observable<number> {
    group.group = group.group.trim().toUpperCase();
    return this.http.post<number>(RestClient.getApiUrl(sprintf(SERVICE_GROUP_UPDATE, group_name)), group);
  }
}
