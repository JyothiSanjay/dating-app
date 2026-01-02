import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading = signal(0);
  constructor() { }

  loadingOn() {
    this.loading.update(value => value + 1);
  }

  loadingOff() {
    this.loading.update(value => Math.max(0, value - 1));
  }
}
