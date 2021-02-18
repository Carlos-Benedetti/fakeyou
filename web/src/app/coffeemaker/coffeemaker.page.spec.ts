import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoffeemakerPage } from './coffeemaker.page';

describe('CoffeemakerPage', () => {
  let component: CoffeemakerPage;
  let fixture: ComponentFixture<CoffeemakerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeemakerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeemakerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
