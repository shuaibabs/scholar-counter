import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskFaqComponent } from './helpdesk-faq.component';

describe('HelpdeskFaqComponent', () => {
  let component: HelpdeskFaqComponent;
  let fixture: ComponentFixture<HelpdeskFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdeskFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpdeskFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
