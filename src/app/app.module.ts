import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// import { AllocSheetComponent } from '@app/resalloc/allocsheet.component';
// import { SprintService } from '@service/sprint.service';
import { StaffService } from '@service/staff.service';
// import { AllocService } from '@service/alloc.service';
import { ResAllocModule } from '@app/resalloc/resalloc.module';

@NgModule({
  declarations: [
    AppComponent// , AllocSheetComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ResAllocModule
  ],
  providers: [/*SprintService, */ StaffService /*, AllocService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
