import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartQuantityService {

  public previewQuantity = new BehaviorSubject<any>('');
  quantityPreview = this.previewQuantity.asObservable();

  constructor() { }

  setQuantity(num: number) {
    return this.previewQuantity.next(num)
  };
}
