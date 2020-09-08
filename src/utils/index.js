export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email));
};

export const checkPassworkError = (password, confirmPassword) => {
  if(password.length < 6) {
    return "Password should be atleast 6 characters";
  }
  if (!confirmPassword) return '';
  if (password !== confirmPassword) {
    return "Passwords don't match!";
  }
};

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 1,
});

export const formatNumber = (value, option) => {
  if (isNaN(value)) return '-';
  else if (option === 'short') {
    return abbreviateNumber(value);
  } else if (option === 'int') {
    value = Math.floor(value);
  }
  return numberFormatter.format(value) + (option === '%' ? '%' : '');
};

export const abbreviateNumber = (number) => {
  if (Math.abs(number) < 1e3) return numberFormatter.format(number);
  else if (Math.abs(number) >= 1e3 && Math.abs(number) < 1e5)
    return numberFormatter.format(number / 1e3) + 'K';
  else if (Math.abs(number) >= 1e5 && Math.abs(number) < 1e7)
    return numberFormatter.format(number / 1e5) + 'L';
  else if (Math.abs(number) >= 1e7 && Math.abs(number) < 1e10)
    return numberFormatter.format(number / 1e7) + 'Cr';
  else if (Math.abs(number) >= 1e10 && Math.abs(number) < 1e14)
    return numberFormatter.format(number / 1e10) + 'K Cr';
  else if (Math.abs(number) >= 1e14)
    return numberFormatter.format(number / 1e14) + 'L Cr';
};
