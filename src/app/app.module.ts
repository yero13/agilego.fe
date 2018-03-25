import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule} from '@app/app.routing';
import { AppComponent } from './app.component';
import { ResAllocModule } from '@app/resalloc/resalloc.module';
import { GanttModule } from '@app/gantt/gantt.module';
import { TeamModule } from '@app/team/team.module';
import { DiscrepencyModule } from '@app/discrepency/discrepency.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, MatTabsModule, ResAllocModule, TeamModule, GanttModule,
    DiscrepencyModule
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
