import { ComponentFixture, TestBed } from '@angular/core/testing';
import {QualificationEditComponent} from './qualification-edit.component';

describe('QualificationEditComponent', () => {

  let component: QualificationEditComponent;
  let fixture: ComponentFixture<QualificationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QualificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
