import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDetailComponent } from './carousel-detail.component';

describe('CarouselDetailComponent', () => {
  let component: CarouselDetailComponent;
  let fixture: ComponentFixture<CarouselDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
