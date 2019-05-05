import * as React from "react";
import "../sass/styles.scss";

export interface IIndexProps {}

export default class Index extends React.Component<IIndexProps, any> {
  public drawing = false;
  public x = 0;
  public y = 0;
  private canvas = React.createRef<HTMLCanvasElement>();

  constructor(props: IIndexProps) {
    super(props);
    this.state = {
      color: "#ff0000",
      size: 1
    };
  }

  public componentDidMount() {
    const canvas = this.canvas.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      if (context) {
        canvas.addEventListener("mousedown", e => {
          this.drawing = true;
          this.x = e.clientX - rect.left;
          this.y = e.clientY - rect.top;
        });

        canvas.addEventListener("mousemove", e => {
          if (this.drawing) {
            this.drawLine(
              context,
              this.x,
              this.y,
              e.clientX - rect.left,
              e.clientY - rect.top
            );
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
          }
        });

        canvas.addEventListener("mouseup", e => {
          if (this.drawing) {
            this.drawLine(
              context,
              this.x,
              this.y,
              e.clientX - rect.left,
              e.clientY - rect.top
            );
            this.drawing = false;
            this.x = 0;
            this.y = 0;
          }
        });
      }
    }
  }

  public drawLine(
    context: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    context.beginPath();
    context.strokeStyle = this.state.color;
    context.lineWidth = this.state.size;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }

  public render() {
    return (
      <div>
        <canvas ref={this.canvas} width="560" height="360">
          Prohlizec nepodporuje canvas.
        </canvas>
        <div>
          <label>Color </label>
          <input
            type="color"
            value={this.state.color}
            onChange={this.colorChange}
          />
        </div>
        <div>
          <label>Size </label>
          <input
            type="range"
            min={1}
            max={100}
            value={this.state.size}
            step={1}
            onChange={this.sizeChange}
          />
          {this.state.size}
        </div>
      </div>
    );
  }

  private colorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      color: e.target.value
    });
  };

  private sizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      size: e.target.value
    });
  };
}
