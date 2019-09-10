import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-fullscreen-viewer',
  templateUrl: './document-fullscreen-viewer.component.html',
  styleUrls: ['./document-fullscreen-viewer.component.scss']
})
export class DocumentFullscreenViewerComponent implements OnInit {
  @Input() documentList;
  @Output() callBackFunc = new EventEmitter();

  zoom_level = 100
  max_zoom_level = 103
  min_zoom_level = 98
  currentZoom = 1.0;
  documents = []
  docIndex;
  selectedDocIndex = 1;
  documentContainer = {
    heigth: 0,
    width: 0
  };

  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    for (var i = 0; i < this.documentList.length; i++) {
      this.documentList[i].index = i + 1;
      this.documentList[i].rotate = 0;
    }
    // Stored Default Size of Images
    this.documentContainer.width = document.getElementById("custom-docs-view").offsetWidth;
    this.documentContainer.heigth = document.getElementById("custom-docs-view").offsetHeight;
  }

  zoom(zm) {
    let img = document.getElementById("custom-docs-view");
    if (zm > 1) {
      if (this.zoom_level < this.max_zoom_level) {
        this.zoom_level++;
      } else {
        return;
      }
    } else if (zm < 1) {
      if (this.zoom_level > this.min_zoom_level) {
        this.zoom_level--;
      } else {
        return;
      }
    }
    let wid = img.offsetWidth;
    let ht = img.offsetHeight;
    img.style.width = (wid * zm) + "px";
    img.style.height = (ht * zm) + "px";
  };

  rotate = function (choice) {
    if (this.docIndex != this.selectedDocIndex) {
      this.rotate_factor = 0;
    }
    this.docIndex = this.selectedDocIndex;
    if (choice == 'right') {
      this.rotate_factor += 1;
    } else {
      this.rotate_factor -= 1;
    }
    this.rotate_angle = (90 * this.rotate_factor) % 360;
    this.documentList[this.selectedDocIndex].rotate = this.rotate_angle;
  };

  reset = function () {
    let img = document.getElementById("custom-docs-view");
    this.rotate_angle = 0;
    this.rotate_factor = 0;
    this.zoom_level = 100
    img.style.width = this.documentContainer.width + "px";
    img.style.height = this.documentContainer.heigth + "px";
    for (var i = 0; i < this.documentList.length; i++) {
      this.documentList[i].rotate = this.rotate_angle;
    }
  };

  backToPrevious() {
    this.callBackFunc.emit();
  };

  selectDocument(index) {
    this.selectedDocIndex = index;
  };

}
