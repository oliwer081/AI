/**
 * cube3d.js — Isometric 3D Rubik's Cube renderer
 * Fixed: proper 2x2 (4 stickers per face) and 3x3 (9 stickers per face)
 */
class RubiksCube3D {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = options.size || 3;
    this.cellSize = options.cellSize || (this.size === 2 ? 52 : 36);
    this.gap = options.gap || 4;
    this.rotX = options.rotX ?? -0.48;
    this.rotY = options.rotY ?? 0.72;
    this.autoRotate = options.autoRotate ?? false;
    this._animFrame = null;

    this.COLORS = {
      U: '#F5F5F0', D: '#F5C842', F: '#E83A2F',
      B: '#F07822', R: '#1D6FA4', L: '#3CA455', X: '#161618'
    };

    const n = this.size * this.size;
    this.faces = {
      U: Array(n).fill('U'), D: Array(n).fill('D'),
      F: Array(n).fill('F'), B: Array(n).fill('B'),
      R: Array(n).fill('R'), L: Array(n).fill('L'),
    };

    this._drag = false; this._lastX = 0; this._lastY = 0;
    this._bindEvents();
    this.render();
  }

  setAllFaces(map) { Object.assign(this.faces, map); this.render(); }

  _bindEvents() {
    const el = this.canvas;
    const down = (x, y) => { this._drag = true; this._lastX = x; this._lastY = y; };
    const move = (x, y) => {
      if (!this._drag) return;
      this.rotY += (x - this._lastX) * 0.013;
      this.rotX += (y - this._lastY) * 0.013;
      this.rotX = Math.max(-1.3, Math.min(1.3, this.rotX));
      this._lastX = x; this._lastY = y;
      this.render();
    };
    el.addEventListener('mousedown', e => down(e.clientX, e.clientY));
    el.addEventListener('touchstart', e => { e.preventDefault(); down(e.touches[0].clientX, e.touches[0].clientY); }, {passive:false});
    window.addEventListener('mouseup', () => this._drag = false);
    window.addEventListener('touchend', () => this._drag = false);
    window.addEventListener('mousemove', e => move(e.clientX, e.clientY));
    window.addEventListener('touchmove', e => move(e.touches[0].clientX, e.touches[0].clientY), {passive:true});
  }

  _project(x, y, z) {
    const cx = Math.cos(this.rotX), sx = Math.sin(this.rotX);
    const cy = Math.cos(this.rotY), sy = Math.sin(this.rotY);
    const x1 = cy * x + sy * z;
    const z1 = -sy * x + cy * z;
    const y2 = sx * z1 + cx * y;
    const z2 = cx * z1 - sx * y;
    const fov = 400;
    const d = fov + z2;
    return { sx: this.canvas.width/2 + x1*fov/d, sy: this.canvas.height/2 + y2*fov/d, z: z2 };
  }

  _faceVisible(face) {
    const n = { U:[0,-1,0], D:[0,1,0], F:[0,0,1], B:[0,0,-1], R:[1,0,0], L:[-1,0,0] }[face];
    const cx = Math.cos(this.rotX), sx = Math.sin(this.rotX);
    const cy = Math.cos(this.rotY), sy = Math.sin(this.rotY);
    const vx = sy, vy = -sx*cy, vz = cx*cy;
    return n[0]*vx + n[1]*vy + n[2]*vz > 0.02;
  }

  render() {
    const { ctx, canvas, size } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cs = this.cellSize, g = this.gap;
    const step = cs + g;
    // total span of one face
    const span = size * step - g;
    const half = span / 2;

    const polys = [];

    const addFace = (faceKey, ox, oy, oz, ax, ay, az, bx, by, bz, u, v) => {
      const colorKey = this.faces[faceKey][v * size + u];
      const col = this.COLORS[colorKey] || this.COLORS.X;
      // Four corners of this sticker
      const corners = [
        [ox, oy, oz],
        [ox + ax*cs, oy + ay*cs, oz + az*cs],
        [ox + ax*cs + bx*cs, oy + ay*cs + by*cs, oz + az*cs + bz*cs],
        [ox + bx*cs, oy + by*cs, oz + bz*cs],
      ].map(([x,y,z]) => this._project(x,y,z));
      const avgZ = corners.reduce((s,p) => s+p.z,0)/4;
      polys.push({ corners, col, avgZ });
    };

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const u = col, v = row;
        const x0 = -half + col * step;
        const y0 = -half + row * step;

        if (this._faceVisible('F')) addFace('F', x0, y0, half+1, 1,0,0, 0,1,0, u,v);
        if (this._faceVisible('B')) addFace('B', half - col*step, y0, -half-1, -1,0,0, 0,1,0, u,v);
        if (this._faceVisible('R')) addFace('R', half+1, y0, half - col*step, 0,0,-1, 0,1,0, u,v);
        if (this._faceVisible('L')) addFace('L', -half-1, y0, -half + col*step, 0,0,1, 0,1,0, u,v);
        if (this._faceVisible('U')) addFace('U', x0, -half-1, half - row*step, 1,0,0, 0,0,-1, u,v);
        if (this._faceVisible('D')) addFace('D', x0, half+1, -half + row*step, 1,0,0, 0,0,1, u,v);
      }
    }

    polys.sort((a,b) => a.avgZ - b.avgZ);
    for (const p of polys) {
      ctx.beginPath();
      ctx.moveTo(p.corners[0].sx, p.corners[0].sy);
      for (let i=1;i<4;i++) ctx.lineTo(p.corners[i].sx, p.corners[i].sy);
      ctx.closePath();
      ctx.fillStyle = p.col;
      ctx.fill();
      ctx.strokeStyle = '#0e0e10';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  startAutoRotate(speed = 0.005) {
    const tick = () => {
      if (!this._drag) { this.rotY += speed; this.render(); }
      this._animFrame = requestAnimationFrame(tick);
    };
    this._animFrame = requestAnimationFrame(tick);
  }

  stopAutoRotate() {
    if (this._animFrame) cancelAnimationFrame(this._animFrame);
  }
}
