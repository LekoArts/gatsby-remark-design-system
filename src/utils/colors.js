module.exports.RGBToCMYK = function RGBToCMYK(_r, _g, _b) {
  let c;
  let m;
  let y;
  let k;

  const r = parseInt(`${_r}`.replace(/\s/g, ''), 10);
  const g = parseInt(`${_g}`.replace(/\s/g, ''), 10);
  const b = parseInt(`${_b}`.replace(/\s/g, ''), 10);

  if (r == null || g == null || b == null || isNaN(r) || isNaN(g) || isNaN(b)) {
    console.warn('Please enter numeric RGB values!');
    return;
  }
  if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
    console.warn('RGB values must be in the range 0 to 255.');
    return;
  }

  if (r === 0 && g === 0 && b === 0) {
    k = 1;
    return {
      C: 0,
      M: 0,
      Y: 0,
      K: 1,
    };
  }

  c = 1 - r / 255;
  m = 1 - g / 255;
  y = 1 - b / 255;

  const minCMY = Math.min(c, Math.min(m, y));
  c = (c - minCMY) / (1 - minCMY);
  m = (m - minCMY) / (1 - minCMY);
  y = (y - minCMY) / (1 - minCMY);
  k = minCMY;

  c = Math.round(c * 100);
  m = Math.round(m * 100);
  y = Math.round(y * 100);
  k = Math.round(k * 100);

  return {
    C: c,
    M: m,
    Y: y,
    K: k,
  };
};
