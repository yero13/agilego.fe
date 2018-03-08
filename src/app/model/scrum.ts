export class Sprint {
  name: string;
  startDate: Date;
  endDate: Date;
  goal: string;
}

export class Allocation {
  key: string;
  parent: string;
  group: string;
  employee: string;
  date: Date;
  whrs: number;
  comment: string;
}

export class BacklogItem {
  key: string;
  type: string;
  priority: string;
  status: string;
  assignee_id: string;
  duedate: Date;
  estimate: number;
  components: string[];
  blocked_by: string[];
  blocks: string[];
}

