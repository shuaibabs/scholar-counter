import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Counter5ReportsComponent } from './counter5-reports.component';

describe('CounterReportsComponent', () => {
  let component: Counter5ReportsComponent;
  let fixture: ComponentFixture<Counter5ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Counter5ReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Counter5ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
