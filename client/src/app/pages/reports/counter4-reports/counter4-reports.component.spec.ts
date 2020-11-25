import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Counter4ReportsComponent } from './counter4-reports.component';

describe('Counter4ReportsComponent', () => {
  let component: Counter4ReportsComponent;
  let fixture: ComponentFixture<Counter4ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Counter4ReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Counter4ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
