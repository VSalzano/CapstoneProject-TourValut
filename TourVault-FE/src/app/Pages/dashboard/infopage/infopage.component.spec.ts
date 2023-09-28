import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfopageComponent } from './infopage.component';

describe('InfopageComponent', () => {
  let component: InfopageComponent;
  let fixture: ComponentFixture<InfopageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfopageComponent]
    });
    fixture = TestBed.createComponent(InfopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
