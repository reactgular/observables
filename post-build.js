const fs = require('fs');

const findFiles = (startPath, filter) => fs.readdirSync(startPath)
  .filter(file => file.endsWith(filter))
  .map(file => `${startPath}/${file}`);

const sort = (arr) => (arr.sort(), arr);

const format = (files) => files
  .map(file => fs.readFileSync(file, 'utf8').replace('/\r/g', ''))
  .map(file => file.split('\n').filter(l => !l.startsWith('import')).filter(Boolean))
  .map(file => [...file, ''])
  .reduce((acc, next) => [...acc, ...next], [])
  .join('\n')
  .trim();

const readme = (token, value) =>
  fs.writeFileSync('./dist/README.md', fs.readFileSync('./README.md', 'utf8').replace(token, value), 'utf8')

const operators = sort(findFiles('./dist/src/operators', '.ts'));
readme('{{OPERATORS}}', format(operators));

const utilities = sort(findFiles('./dist/src/utils', '.ts'));
readme('{{UTILITIES}}', format(utilities));
