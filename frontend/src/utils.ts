export const capitalize = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// add comma to each 3 numbers
export const formatNumber = (
  num: number | string,
  max?: number,
  separator = ',',
): string | false => {
  if (num === 0) {
    return '0';
  }
  if (!num) {
    return false;
  }

  const dotFormat = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  if (typeof num === 'number' && max && num === max) {
    return `${dotFormat}+`;
  }
  return dotFormat;
};

export const removeZeroFromDecimal = (num: string): number | string =>
  Number.isInteger(parseFloat(num)) ? parseInt(num) : num;

export const minifyNumber = (
  num: number,
  exactNumberIfLessThanThousand: boolean,
  showWithoutDecimal?: boolean,
): string => {
  if (isNaN(num)) {
    return '';
  }

  if (num > 999999999) {
    const res = (num / 1000000000).toFixed(showWithoutDecimal ? 0 : 2);
    return formatNumber(removeZeroFromDecimal(res)) + ' B';
  }

  if (num > 999999) {
    const res = (num / 1000000).toFixed(showWithoutDecimal ? 0 : 2);
    return formatNumber(removeZeroFromDecimal(res)) + ' M';
  }

  if (num >= 1000) {
    const res = (num / 1000).toFixed(showWithoutDecimal ? 0 : 1);
    return formatNumber(removeZeroFromDecimal(res)) + ' K';
  }

  if (showWithoutDecimal && exactNumberIfLessThanThousand) {
    return num.toFixed();
  }

  return exactNumberIfLessThanThousand ? num.toString() : '< 1K';
};
