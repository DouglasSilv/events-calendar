const render = (html, element) => {
  element.innerHTML = html;
}

const daysInMonth = (month, year) => {
  const date = new Date(year, month + 1, 0).getDate();
  return Array.from(Array(date).keys());
};

const mapRender = (array, func) => {
  return array.reduce((html, value, index) => 
          `${index === 1 ? `${func(value, index)} \n` : html}${func(value, index)} \n`);
};