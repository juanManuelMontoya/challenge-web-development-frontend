import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceV2Component } from './race-v2.component';

describe('RaceV2Component', () => {
  let component: RaceV2Component;
  let fixture: ComponentFixture<RaceV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
