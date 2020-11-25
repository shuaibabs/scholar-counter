import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformModifierComponent } from './platform-modifier.component';

describe('PlatformModifierComponent', () => {
  let component: PlatformModifierComponent;
  let fixture: ComponentFixture<PlatformModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
