import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /all-patients-list if name and surname are correct', () => {
    component.name = 'Jane';
    component.surname = 'Brown';

    component.login();

    expect(localStorage.getItem('name')).toBe('Jane');
    expect(localStorage.getItem('surname')).toBe('Brown');
    expect(router.navigate).toHaveBeenCalledWith(['/all-patients-list']);
  });

  it('should show an alert if name and surname are incorrect', () => {
    component.name = 'John';
    component.surname = 'Doe';

    spyOn(window, 'alert');
    component.login();

    expect(localStorage.getItem('name')).toBeNull();
    expect(localStorage.getItem('surname')).toBeNull();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Invalid Name or Surname');
  });
});