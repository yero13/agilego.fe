import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'dhtmlx-gantt';
import {} from '@types/dhtmlxgantt';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip';
import { GanttService} from '@service/gantt.service';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html'
})
export class GanttComponent implements OnInit {
  @ViewChild('gantt_here') ganttContainer: ElementRef;

  constructor(private ganttService: GanttService) {}

  ngOnInit() {
    gantt.config.xml_date = '%Y-%m-%d';
    gantt.config.fit_tasks = true;
    gantt.config.autofit = true;
    gantt.config.autosize = true;
    gantt.config.task_attribute = 'estimate';
    gantt.config.show_unscheduled = true;
    gantt.config.columns = [
      {name: 'text', label: 'Task', tree: true, width: 170},
      {name: 'start_date', label: 'Start', align: 'center', width: 85},
      {name: 'end_date', label: 'End', align: 'center', width: 85},
      {name: 'duedate', label: 'Due', align: 'center', width: 85},
      {name: 'estimate', label: 'Estimate', align: 'center', width: 40},
      {name: 'whrs', label: 'Alloc', align: 'center', width: 40}
    ];
    gantt.config.readonly = true;
    gantt.templates.tooltip_text = function(start,end,task){
      return '<b>Task:</b> ' + task.text + '<br/>' +
        '<b>Type:</b> ' + task.type + '<br/>' +
        '<b>Start date:</b> ' + gantt.templates.tooltip_date_format(start) +
        '<br/><b>End date:</b> ' + gantt.templates.tooltip_date_format(end);
    };
    gantt.init(this.ganttContainer.nativeElement);
    forkJoin(this.ganttService.getTasks(),
      this.ganttService.getLinks())
      .subscribe(([data, links]) => { gantt.parse({data, links}); },
        error => console.error(`Error: ${error}`));
    }
}
