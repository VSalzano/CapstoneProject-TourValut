import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliogruppoComponent } from './dettagliogruppo.component';

describe('DettagliogruppoComponent', () => {
  let component: DettagliogruppoComponent;
  let fixture: ComponentFixture<DettagliogruppoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DettagliogruppoComponent]
    });
    fixture = TestBed.createComponent(DettagliogruppoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
