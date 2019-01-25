import {vec3, vec4} from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import {gl} from '../globals';

function generate_cube_face(
  out_indices: number[], out_normals: number[], out_positions: number[],
  vertices: Array<Array<number>>, normal: number[]) : void {

  let index_offset = out_positions.length / 4;
  for (let i = 0; i < vertices.length; ++i) {
    let vertex = vertices[i];
    out_positions.push(...vertex, 1);
    out_normals.push(...normal, 0)
  }
  out_indices.push(
    0 + index_offset, 1 + index_offset, 2 + index_offset,
    0 + index_offset, 2 + index_offset, 3 + index_offset
  );
}

class Cube extends Drawable {
  index_buffer: Uint32Array;
  position_buffer: Float32Array;
  normal_buffer: Float32Array;

  constructor() {
    super();
  }

  create() {
    let indices: number[] = [];
    let normals: number[] = [];
    let positions: number[] = [];
    generate_cube_face(indices, normals, positions,
      [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]], [0, 0, -1]);
    generate_cube_face(indices, normals, positions,
      [[1, 0, 0], [1, 0, 1], [1, 1, 1], [1, 1, 0]], [1, 0, 0]);
    generate_cube_face(indices, normals, positions,
      [[0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]], [0, 1, 0]);
    generate_cube_face(indices, normals, positions,
      [[0, 0, 1], [1, 0, 1], [1, 0, 0], [0, 0, 0]], [0, -1, 0]);
    generate_cube_face(indices, normals, positions,
      [[0, 0, 1], [0, 0, 0], [0, 1, 0], [0, 1, 1]], [-1, 0, 0]);
    generate_cube_face(indices, normals, positions,
      [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]], [0, 0, 1]);

    this.index_buffer = new Uint32Array(indices);
    this.normal_buffer = new Float32Array(normals);
    this.position_buffer = new Float32Array(positions);

    this.generateIdx();
    this.generateNor();
    this.generatePos();

    this.count = this.index_buffer.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
    gl.bufferData(gl.ARRAY_BUFFER, this.normal_buffer, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, this.position_buffer, gl.STATIC_DRAW);

    console.log('Created cube');
  }
};

export default Cube;

