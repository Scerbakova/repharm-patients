import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirm event when confirmDelete is called', () => {
    const confirmSpy = spyOn(component.confirm, 'emit');
    component.confirmDelete();
    expect(confirmSpy).toHaveBeenCalled();
  });
  
  it('should emit cancel event when cancelDelete is called', () => {
    const cancelSpy = spyOn(component.cancel, 'emit');
    component.cancelDelete();
    expect(cancelSpy).toHaveBeenCalled();
  });
  it('should emit confirm and cancel events', () => {
    let confirmEventEmitted = false;
    let cancelEventEmitted = false;
  
    component.confirm.subscribe(() => {
      confirmEventEmitted = true;
    });
  
    component.cancel.subscribe(() => {
      cancelEventEmitted = true;
    });
  
    component.confirmDelete();
    component.cancelDelete();
  
    expect(confirmEventEmitted).toBeTruthy();
    expect(cancelEventEmitted).toBeTruthy();
  });
});
