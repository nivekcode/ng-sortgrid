import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSortgridComponent } from './ng-sortgrid.component';

describe('NgSortgridComponent', () => {
  let component: NgSortgridComponent;
  let fixture: ComponentFixture<NgSortgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSortgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSortgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
