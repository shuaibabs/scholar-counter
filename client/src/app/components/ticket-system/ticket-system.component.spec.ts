import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSystemComponent } from './ticket-system.component';

describe('TicketSystemComponent', () => {
  let component: TicketSystemComponent;
  let fixture: ComponentFixture<TicketSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
