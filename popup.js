(() => {
  const HEXToRGBBtn = document.getElementById('HEXToRGB');
  const RGBToHEXBtn = document.getElementById('RGBToHEX');
  const err = document.getElementById('err')
  const hex = document.getElementById('hex');
  const rgb = document.getElementById('rgb');

  HEXToRGBBtn.addEventListener('click', function () {
    try {
      const res = HEXToRGB(hex.value);
      rgb.value = res;
    } catch (e) {
      showError(e);
      throw e;
    }
  });
  RGBToHEXBtn.addEventListener('click', function () {
    try {
      const res = RGBToHEX(rgb.value);
      hex.value = res;
    } catch (e) {
      showError(e);
      throw e;
    }
  });

  hex.addEventListener('focus', function () {
    hideError();
  });
  rgb.addEventListener('focus', function () {
    hideError();
  });

  const HEXToRGB = (hex) => {
    const reg = /([0-9a-f]{6}|[0-9a-f]{3})/;
    if (!reg.test(hex)) {
      throw new Error('Invalid hex valid.');
    } else {
      hex = hex.match(reg)[0];
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      const r = H2D(hex.slice(0, 2));
      const g = H2D(hex.slice(2, 4));
      const b = H2D(hex.slice(4, 6));
      return `rgb(${r}, ${g}, ${b})`;
    }
  };
  const RGBToHEX = (rgb) => {
    const reg = /(?:rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*\d*\.?\d*)?\s*\))/;
    if (!reg.test(rgb)) {
      throw new Error('Invalid rgb valid.');
    } else {
      const res = rgb.match(reg);
      checkRange(res[1]);
      checkRange(res[2]);
      checkRange(res[3]);
      const r = D2H(res[1]);
      const g = D2H(res[2]);
      const b = D2H(res[3]);
      return `#${r}${g}${b}`;
    }
  };

  const H2D = (h) => {
    return Number('0x' + h).toString(10);
  };
  const D2H = (d) => {
    return ('0' + Number('' + d).toString(16)).slice(-2);
  };

  const checkRange = (n) => {
    if (Number(n) < 0 || Number(n) > 255) {
      throw('Range error.');
    }
  };

  const showError = (msg) => {
    err.innerText = msg;
    err.style.display = 'block';
  };
  const hideError = () => {
    err.style.display = 'none';
  }
})();
