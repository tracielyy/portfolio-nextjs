export default class Language {
  static EN = Object.freeze(new Language('EN', 'en'));
  static ZH = Object.freeze(new Language('ZH', 'zh'));

  constructor(label, value) {
    this.label = label;
    this.value = value;
  }

  getLabel() {
    return this.label;
  }

  toString() {
    return this.value;
  }

  static values() {
    return Object.values(Language).filter(v => v instanceof Language);
  }

  static isValid(language) {
    return language instanceof Language;
  }
}

Object.freeze(Language);