import { TestBed } from '@angular/core/testing';

import { TarefahistoricoService } from './tarefahistorico.service';

describe('TarefahistoricoService', () => {
  let service: TarefahistoricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarefahistoricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
