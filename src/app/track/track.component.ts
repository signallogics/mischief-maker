import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

const WaveSurfer = window['WaveSurfer'];

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit, OnChanges {
  @ViewChild('trackWave') trackWave;
  @Input() blob;
  @Input() playing;
  waveSurfer = null;

  ngOnInit() {
    this.waveSurfer = WaveSurfer.create({
      container: this.trackWave.nativeElement,
      scrollParent: true,
      waveColor: 'violet',
      progressColor: 'purple'
    });
    // Loop
    this.waveSurfer.on('finish', () => this.waveSurfer.playPause());
    // Load
    this.waveSurfer.loadBlob(this.blob);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playing']) {
      if (!this.waveSurfer) { return; }
      this.waveSurfer.playPause();
    }
  }
}
