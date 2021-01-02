import { Component, OnDestroy, ElementRef, Output, ViewChild, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import Square from 'src/app/models/square';
import { SquaresService } from 'src/app/services/squares.service';
import { ArcRotateCamera, Animation, Color3, Engine, HemisphericLight, Mesh, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

  squares$: Observable<Square[]> = null;
  showError: boolean = false;

  sceneGrid: Square[] = null;
  firstTime: boolean = true;

  throttleTime: number = 1000;
  destroy$: Subject<boolean> = new Subject<boolean>();
  clicks$: Subject<string> = new Subject<string>();


  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  @Output() engine: Engine;
  @Output() scene: Scene;
  @Output() camera: ArcRotateCamera;

  constructor(
    private readonly squaresService: SquaresService
  ) {

    this.squaresService.squares$.pipe(
      takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.sceneGrid = data;
          if (this.firstTime) {
            this.createScene(this.scene, this.canvas.nativeElement);
          } else {
            const updatedBoxId = this.squaresService.lastUpdatedId;
            const newColor = new Color3(...this.sceneGrid[updatedBoxId]);
            const updatedBox = this.scene.meshes[updatedBoxId];
            Animation.CreateAndStartAnimation(
              'anim',
              updatedBox,
              'material.diffuseColor',
              1,
              1,
              updatedBox.material.diffuseColor,
              newColor,
              0);
          }
        }
      });

    this.clicks$.pipe(
      takeUntil(this.destroy$),
      throttleTime(this.throttleTime))
      .subscribe(id => {
        this.squaresService.updateSquare(id)
      });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  updateSquareColor(id: string) {
    this.clicks$.next(id);
  }

  ngOnInit(): void {
    this.engine = new Engine(this.canvas.nativeElement, true);
    this.scene = new Scene(this.engine);
    this.camera = this.createCamera(this.scene);
    this.camera.attachControl(this.canvas.nativeElement, true);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    this.scene.onPointerObservable.add(evt => {
      if (evt.pickInfo.hit && evt.pickInfo.pickedMesh && evt.event.button === 0) {
        this.updateSquareColor(evt.pickInfo.pickedMesh.metadata);
      }
    });
  }

  createCamera(scene: Scene) {
    const camera = new ArcRotateCamera('Camera', -Math.PI / 2, Math.PI / 3, 15, Vector3.Zero(), scene);
    camera.attachControl(this.canvas, true);
    return camera;
  }

  createScene(scene: Scene, canvas: HTMLCanvasElement) {
    const light = new HemisphericLight('light', new Vector3(1, 1, 0), scene);
    this.firstTime = false;
    const row = 3;
    const column = 3;
    let boxIndex = 0;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        var box = Mesh.CreateBox(`box${i + j}`, 1, scene, true);
        box.position.copyFromFloats(i, j, 0);
        var mat = new StandardMaterial(`mat${i + j}`, scene);
        const boxColors = this.sceneGrid[boxIndex];
        mat.diffuseColor = new Color3(boxColors[0], boxColors[1], boxColors[2]);
        box.metadata = boxIndex;
        box.material = mat;
        boxIndex++;
      }
    }
  }

}
