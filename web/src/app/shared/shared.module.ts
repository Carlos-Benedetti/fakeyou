import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestLoaderComponent } from 'src/app/shared/request-loader/request-loader.component';



@NgModule({
  declarations: [RequestLoaderComponent],
  imports: [CommonModule],
  exports:[RequestLoaderComponent]
})
export class SharedModule { }
