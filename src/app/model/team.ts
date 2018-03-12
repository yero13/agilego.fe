export class Employee {
  name: string;
  displayName: string;
}

export class Group {
  group: string;
  components: string[];
  employees: Employee[];
  capacity: number;
}
