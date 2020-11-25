import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskContactUsComponent } from './helpdesk-contact-us.component';

describe('HelpdeskContactUsComponent', () => {
  let component: HelpdeskContactUsComponent;
  let fixture: ComponentFixture<HelpdeskContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdeskContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpdeskContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
