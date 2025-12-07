/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToastServiceService } from './toast-service.service';

describe('Service: ToastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastServiceService]
    });
  });

  it('should ...', inject([ToastServiceService], (service: ToastServiceService) => {
    expect(service).toBeTruthy();
  }));
});
