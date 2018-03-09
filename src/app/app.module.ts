import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule} from '@app/app.routing';
import { AppComponent } from './app.component';
import { StaffService } from '@service/staff.service';
import { ResAllocModule } from '@app/resalloc/resalloc.module';
import { GanttModule } from '@app/gantt/gantt.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, MatTabsModule, ResAllocModule, GanttModule
  ],
  providers: [ StaffService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
