import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhestarefaComponent } from './detalhestarefa.component';

describe('DetalhestarefaComponent', () => {
  let component: DetalhestarefaComponent;
  let fixture: ComponentFixture<DetalhestarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhestarefaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhestarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
