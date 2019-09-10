import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFullscreenViewerComponent } from './document-fullscreen-viewer.component';

describe('DocumentFullscreenViewerComponent', () => {
  let component: DocumentFullscreenViewerComponent;
  let fixture: ComponentFixture<DocumentFullscreenViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentFullscreenViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentFullscreenViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
