import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScDetailsComponent } from './sc-details.component';

describe('ScDetailsComponent', () => {
  let component: ScDetailsComponent;
  let fixture: ComponentFixture<ScDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
