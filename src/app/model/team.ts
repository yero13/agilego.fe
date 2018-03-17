export class Employee {
  name: string;
  displayName: string;
  capacity: number;
}

export class Group {
  group: string;
  components: string[];
  employees: Employee[];
  capacity: number;
}
