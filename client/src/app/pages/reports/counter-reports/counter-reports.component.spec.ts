import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterReportsComponent } from './counter-reports.component';

describe('CounterReportsComponent', () => {
  let component: CounterReportsComponent;
  let fixture: ComponentFixture<CounterReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
