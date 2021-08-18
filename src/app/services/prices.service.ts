import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  public previewPrices = new BehaviorSubject<any>('');
  pricesPreview = this.previewPrices.asObservable();

  constructor() { }

  setPrices(obj:object) {
    return this.previewPrices.next(obj)
  };
}
