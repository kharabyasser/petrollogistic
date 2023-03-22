import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PPanelChildComponent } from './p-panel-child.component';

describe('PPanelChildComponent', () => {
  let component: PPanelChildComponent;
  let fixture: ComponentFixture<PPanelChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PPanelChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PPanelChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
