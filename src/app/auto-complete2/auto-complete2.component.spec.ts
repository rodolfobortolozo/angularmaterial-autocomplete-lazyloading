import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoComplete2Component } from './auto-complete2.component';

describe('AutoComplete2Component', () => {
  let component: AutoComplete2Component;
  let fixture: ComponentFixture<AutoComplete2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoComplete2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoComplete2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
