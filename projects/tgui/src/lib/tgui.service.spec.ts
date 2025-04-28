import { TestBed } from '@angular/core/testing';

import { TguiService } from './tgui.service';

describe('TguiService', () => {
  let service: TguiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TguiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
