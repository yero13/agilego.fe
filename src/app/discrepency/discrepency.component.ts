import { Component, OnInit } from '@angular/core';
import { StatusService} from '@service/status.service';
import { ResourceService } from '@service/resource.service';
import { Discrepency, DIFF_MOVED_OUT, DIFF_NO_CHANGES, DIFF_ADDED_IN } from '@app/model/status';
import { Employee } from '@app/model/team';

@Component({
  selector: 'app-discrepency',
  templateUrl: './discrepency.component.html'
})
export class DiscrepencyComponent implements OnInit {
  statusDate: Date;
  discrepencies: Discrepency[];
  employees: Employee[];

  constructor(private statusService: StatusService, private resourceService: ResourceService) {}

  ngOnInit() {
    this.statusService.getStatusDate().subscribe(date => this.statusDate = date ? date.serverdate : null);
    this.statusService.getDiscrepencies().subscribe(discrepencies => this.discrepencies = discrepencies);
    this.resourceService.getEmployees().subscribe(employees => this.employees = employees);
  }

  scopeDiff(diff: string): string {
    switch (diff) {
      case DIFF_NO_CHANGES: return '';
      case DIFF_ADDED_IN: return 'ADDED';
      case DIFF_MOVED_OUT: return 'MOVED OUT';
    }
  }

  getEmployeeDisplayName(employee_id: string): string {
    if (this.employees) {
      for (let employee of this.employees) {
        if (employee.name === employee_id) {
          return employee.displayName;
        }
      }
    }
    return 'NOT FOUND';
  }
}
