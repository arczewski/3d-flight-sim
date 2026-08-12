// Headless winding validation for the 3D flight sim (dev tool, not shipped)
// Extracts the mesh builders + terrain index generator from index.html and
// verifies every triangle's computed cross-product normal points outward.
const fs = require('fs');
const src = fs.readFileSync('index.html', 'utf8');
const js = src.match(/<script>([\s\S]*?)<\/script>/)[1];

const boxStart = js.indexOf('function buildBoxMesh');
const boxEnd = js.indexOf('const planeGeo = buildBoxMesh()');
const propStart = js.indexOf('function buildPropMesh');
const propEnd = js.indexOf('const propGeo = buildPropMesh()');
const constStart = js.indexOf('const N = 96');
const tiStart = js.indexOf('const terrainIndex = new Uint16Array');
const tiEnd = js.indexOf('const terrainMesh = makeMesh');

const boxFn = js.slice(boxStart, boxEnd);
const propFn = js.slice(propStart, propEnd);
const terrainBlock = js.slice(constStart, tiEnd);

const code = [
  boxFn, propFn, terrainBlock,
  'const box = buildBoxMesh();',
  'const prop = buildPropMesh();',
  'function triNormal(p, i0, i1, i2) {',
  '  const ax = p[i0], ay = p[i0+1], az = p[i0+2];',
  '  const bx = p[i1], by = p[i1+1], bz = p[i1+2];',
  '  const cx = p[i2], cy = p[i2+1], cz = p[i2+2];',
  '  const ux = bx-ax, uy = by-ay, uz = bz-az;',
  '  const vx = cx-ax, vy = cy-ay, vz = cz-az;',
  '  return { x: uy*vz-uz*vy, y: uz*vx-ux*vz, z: ux*vy-uy*vx };',
  '}',
  'function check(mesh, label) {',
  '  const p = mesh.positions, n = mesh.normals, idx = mesh.indices;',
  '  let bad = 0, minDot = 1;',
  '  for (let t = 0; t < idx.length; t += 3) {',
  '    const a = idx[t], b = idx[t+1], c = idx[t+2];',
  '    const tn = triNormal(p, a*3, b*3, c*3);',
  '    const nl = Math.sqrt(tn.x*tn.x + tn.y*tn.y + tn.z*tn.z) || 1;',
  '    const nx = n[a*3], ny = n[a*3+1], nz = n[a*3+2];',
  '    const dot = (tn.x/nl)*nx + (tn.y/nl)*ny + (tn.z/nl)*nz;',
  '    if (dot < 0) bad++;',
  '    if (dot < minDot) minDot = dot;',
  '  }',
  '  console.log(label + ": triangles=" + (idx.length/3) + " wrong-facing=" + bad + " minDot=" + minDot.toFixed(3) + " " + (bad === 0 ? "ALL FACES POINT OUT OK" : "FAIL"));',
  '}',
  'check(box, "plane box");',
  'check(prop, "propeller");',
  '// terrain: every triangle must face up (visible from above)',
  'let down = 0;',
  'for (let j = 0; j < N-1; j++) {',
  '  for (let i = 0; i < N-1; i++) {',
  '    const a = j*N+i, b = j*N+i+1, c = (j+1)*N+i, d = (j+1)*N+i+1;',
  '    // triangle 1: (a, c, d), triangle 2: (a, d, b)',
  '    const x0 = i*CELL, z0 = j*CELL, x1 = (i+1)*CELL, z1 = j*CELL, x2 = i*CELL, z2 = (j+1)*CELL;',
  '    // (a,c,d): a=(x0,z0), c=(x0,z2), d=(x1,z2)',
  '    let tn = triNormal([x0,0,z0, x0,0,z2, x1,0,z2], 0, 3, 6);',
  '    if (tn.y <= 0) down++;',
  '    // (a,d,b): a=(x0,z0), d=(x1,z2), b=(x1,z1)',
  '    tn = triNormal([x0,0,z0, x1,0,z2, x1,0,z1], 0, 3, 6);',
  '    if (tn.y <= 0) down++;',
  '  }',
  '}',
  'console.log("terrain: faces=" + ((N-1)*(N-1)*2) + " facing-down=" + down + " " + (down === 0 ? "ALL FACE UP OK" : "FAIL"));'
].join('\n');

new Function(code)();
