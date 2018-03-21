import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class RestClient {
  constructor(protected http: HttpClient) {
  }

  public static getApiUrl(service: string): string {
    return environment.apiUrl + service;
  }
}
