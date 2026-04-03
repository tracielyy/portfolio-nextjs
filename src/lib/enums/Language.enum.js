export default class Language {
  static EN = Object.freeze(new Language('en'));
  static ZH = Object.freeze(new Language('zh'));

  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

Object.freeze(Language);