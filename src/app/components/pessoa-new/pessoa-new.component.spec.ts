import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaNewComponent } from './pessoa-new.component';

describe('PessoaNewComponent', () => {
  let component: PessoaNewComponent;
  let fixture: ComponentFixture<PessoaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
