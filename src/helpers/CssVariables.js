/* eslint-disable class-methods-use-this */
class CssVariables {

  static getValue(variable) {
    switch (variable) {
      case '--c-card-text-height':
      case '--c-card-text-width':
      case '--c-menu-height':
        return parseFloat(getComputedStyle(document.documentElement)
          .getPropertyValue(variable)
          .replace('px', ''));
      default:
        return 'variable is not in list';
    }
  }
}

export default CssVariables;
