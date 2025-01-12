import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationAddEmployeeComponent } from './qualification-add-employee.component';

describe('QualificationAddEmployeeComponent', () => {
  let component: QualificationAddEmployeeComponent;
  let fixture: ComponentFixture<QualificationAddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationAddEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
