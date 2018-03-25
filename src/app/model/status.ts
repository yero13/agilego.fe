export const DIFF_NO_CHANGES = 'no_changes';
export const DIFF_MOVED_OUT = 'moved_out_sprint';
export const DIFF_ADDED_IN = 'added_to_sprint';


export class Discrepency {
  key: string;
  assignee: string;
  assignee_id: string;
  spent: number;
  whrs_plan: number;
  start_plan: Date;
  end_plan: Date;
  status: string;
  assignees_plan: any[];
  sprint_diff: string;
}

export class StatusDate {
  serverdate: Date;
}
