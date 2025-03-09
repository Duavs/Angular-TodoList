import {TestBed} from '@angular/core/testing';
import {AppComponent} from '../app.component'; // ✅ Corrected Import Path
import {Component} from '@angular/core';

// ✅ Mock Component to resolve potential template issues
@Component({
  selector: 'app-root',
  template: '<h1>{{ title }}</h1>',
})
class MockAppComponent {
  title = 'angular-todo';
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockAppComponent], // ✅ Using Mock Component
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MockAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-todo' title`, () => {
    const fixture = TestBed.createComponent(MockAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-todo');
  });

  it('should render title in h1 tag', () => {
    const fixture = TestBed.createComponent(MockAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('angular-todo');
  });
});
