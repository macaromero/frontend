import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompCommunicationService {

  public previewData = new BehaviorSubject<any>('');
  dataPreview = this.previewData.asObservable();

  constructor() { }

  setData(obj:object) {
    return this.previewData.next(obj)
  };
}
