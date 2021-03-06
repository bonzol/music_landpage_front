import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandpageComponent } from './landpage.component';

describe('MainComponent', () => {
  let component: LandpageComponent;
  let fixture: ComponentFixture<LandpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandpageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
