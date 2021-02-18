import { Component, OnInit } from '@angular/core';
import { RequestLoaderService } from './request-loader.service';

@Component({
  selector: 'app-request-loader',
  templateUrl: './request-loader.component.html',
  styleUrls: ['./request-loader.component.scss'],
})
export class RequestLoaderComponent implements OnInit {

  constructor(public requestLoaderService:RequestLoaderService) { }

  ngOnInit() {}

}
