import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreautenteComponent } from './areautente.component';

describe('AreautenteComponent', () => {
  let component: AreautenteComponent;
  let fixture: ComponentFixture<AreautenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreautenteComponent]
    });
    fixture = TestBed.createComponent(AreautenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
