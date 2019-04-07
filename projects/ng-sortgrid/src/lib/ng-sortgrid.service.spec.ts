import { TestBed } from '@angular/core/testing';

import { NgSortgridService } from './ng-sortgrid.service';

describe('NgSortgridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSortgridService = TestBed.get(NgSortgridService);
    expect(service).toBeTruthy();
  });
});
