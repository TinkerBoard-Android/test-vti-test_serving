import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SearchBarComponent} from './search-bar.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {AppRoutingModule} from '../../app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {TestsModule} from '../../shared/modules/tests.module';
import {Error404Component} from '../error/404/404.component';

describe('SearchBarComponent', () => {
  let fixture;
  let component;
  let heroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        AppRoutingModule
      ],
      declarations: [
        SearchBarComponent,
        Error404Component
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should create hero search component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should get all heroes', fakeAsync(() => {
    spyOn(heroService, 'getAllHeroes').and.returnValue(Promise.resolve(true));
    tick();
    fixture.detectChanges();
    expect(component.defaultHeroes.length).toBeGreaterThan(0);
    for (const hero of component.defaultHeroes) {
      expect(hero.default).toBe(true);
    }
  }));

  it('should filter heroes array', (() => {
    component.defaultHeroes = [
      {
        'id': 1,
        'name': 'batman',
        'default': true
      },
      {
        'id': 2,
        'name': 'spiderman',
        'default': false
      }
    ];
    expect(component.filterHeroes('batman').length).toBe(1);
    expect(component.filterHeroes('spiderman').length).toBe(0);
    expect(component.filterHeroes().length).toBe(2);
  }));
});