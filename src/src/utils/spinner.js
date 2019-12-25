import ora from 'ora';

export default class {
  constructor(text = 'start Loading', end) {
    this.spinner = ora({
      text,
      hideCursor: true,
      interval: 50,
    });
    this.finaltext = end || '';
  }

  start() {
    return this.spinner.start();
  }

  stop(symbol = '✨', description) {
    const text = this.finaltext || description;
    return this.spinner.stopAndPersist({
      symbol,
      text,
    });
  }

  changeText(text) {
    this.spinner.text = text;
  }

  clear() {
    this.spinner.clear();
  }

  get loading() {
    return this.spinner.isSpinning;
  }
}
