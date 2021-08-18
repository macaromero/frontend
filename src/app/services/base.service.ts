import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }
  get(url:string) {
    return this.http.get(url)
  };
  getSingle(url:string, id:number) {
    return this.http.get(`${url}/${id}`)
  }
  post(url:string, obj:{}):any {
    return this.http.post(url, obj, {})
  };
  put(url:string, obj:{}, id:number):any {
    return this.http.put(`${url}/${id}`, obj, {})
  };
}
