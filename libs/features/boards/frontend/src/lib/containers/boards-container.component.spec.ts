import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsContainerComponent } from './boards-container.component';

describe('BoardsContainerComponent', () => {
  let component: BoardsContainerComponent;
  let fixture: ComponentFixture<BoardsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
