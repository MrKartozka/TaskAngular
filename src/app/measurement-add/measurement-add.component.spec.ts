import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementAddComponent } from './measurement-add.component';

describe('MeasurementAddComponent', () => {
  let component: MeasurementAddComponent;
  let fixture: ComponentFixture<MeasurementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasurementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
