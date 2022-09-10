import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosPanelComponent } from './photos-panel.component';

describe('PanelsComponent', () => {
  let component: PhotosPanelComponent;
  let fixture: ComponentFixture<PhotosPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotosPanelComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
