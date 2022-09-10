import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelBtnComponent } from './admin-panel-btn.component';

describe('AdminPanelBtnComponent', () => {
  let component: AdminPanelBtnComponent;
  let fixture: ComponentFixture<AdminPanelBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
