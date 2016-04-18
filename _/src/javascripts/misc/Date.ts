'use strict';

export function today(): string {
  const now = new Date;
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  return `${year}/${forceTwoDigit(month)}/${forceTwoDigit(date)}`;
}

function forceTwoDigit(n: number): string {
  return `0${n}`.slice(-2);
}
