const render = (html, element) => {
  element.innerHTML = html;
}

const daysInMonth = (month, year) => {
  const date = new Date(year, month + 1, 0).getDate();
  return Array.from(Array(date).keys());
};

const mapRender = (array, func) => array.reduce((html, value, index) => { 
  const transformedValue = func(value, index);
  if (!transformedValue) return html;
  return html + transformedValue;
}, '');

const concatenateHTMLs = (...arguments) => mapRender(arguments, value => value);