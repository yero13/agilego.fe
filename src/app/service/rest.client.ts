import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestClient {
  private BE = 'http://127.0.0.1:5000';

  constructor(protected http: HttpClient) {
  }

  public getUrl(service: string): string {
    return this.BE + service;
  }
}
