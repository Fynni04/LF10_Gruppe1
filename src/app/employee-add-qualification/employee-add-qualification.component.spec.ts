import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddQualificationComponent } from './employee-add-qualification.component';

describe('EmployeeAddQualificationComponent', () => {
  let component: EmployeeAddQualificationComponent;
  let fixture: ComponentFixture<EmployeeAddQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAddQualificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAddQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
