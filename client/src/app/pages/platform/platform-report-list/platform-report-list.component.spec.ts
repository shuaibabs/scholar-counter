import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformReportListComponent } from './platform-report-list.component';

describe('PlatformReportListComponent', () => {
  let component: PlatformReportListComponent;
  let fixture: ComponentFixture<PlatformReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
