import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformReportsComponent } from './platform-reports.component';

describe('PlatformReportsComponent', () => {
  let component: PlatformReportsComponent;
  let fixture: ComponentFixture<PlatformReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
