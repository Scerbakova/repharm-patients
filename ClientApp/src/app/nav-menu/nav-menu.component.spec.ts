import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
    });

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create the NavMenuComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isExpanded to false', () => {
    expect(component.isExpanded).toBe(false);
  });

  it('should toggle isExpanded property when toggle() is called', () => {
    expect(component.isExpanded).toBe(false);
    component.toggle();
    expect(component.isExpanded).toBe(true);
    component.toggle();
    expect(component.isExpanded).toBe(false);
  });

  it('should set isExpanded to true when collapse() is called', () => {
    expect(component.isExpanded).toBe(false);
    component.collapse();
    expect(component.isExpanded).toBe(false);
  });
});