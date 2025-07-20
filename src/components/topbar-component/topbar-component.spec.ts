import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar-component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>; // ✅ Added generic type

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TopbarComponent, // standalone component
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
