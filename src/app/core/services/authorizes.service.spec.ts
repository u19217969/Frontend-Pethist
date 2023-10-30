import { TestBed } from '@angular/core/testing';

import { AuthorizesService } from './authorizes.service';

describe('AuthorizesService', () => {
  let service: AuthorizesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
