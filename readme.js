#!/usr/bin/env node
const fs = require('fs');
const mustache = require('mustache');

const findFiles = (startPath, filter) => fs.readdirSync(startPath)
  .filter(file => file.endsWith(filter))
  .map(file => `${startPath}/${file}`);

const sort = (arr) => (arr.sort(), arr);

const readFile = file => fs.readFileSync(file, 'utf8').replace('/\r/g', '').split('\n');
const stripImports = lines => lines.filter(l => !l.startsWith('import')).filter(Boolean);
const stripExports = lines => lines.map(l => l.replace(/^export declare /,''));
const appendBlankLine = lines => ([...lines, '']);

const format = (files) => files
  .map(readFile)
  .map(stripImports)
  .map(stripExports)
  .map(appendBlankLine)
  .reduce((acc, next) => [...acc, ...next], [])
  .join('\n')
  .trim();

const operators = format(sort(findFiles('./dist/operators', '.ts')));
const utilities = format(sort(findFiles('./dist/utils', '.ts')));

const template = fs.readFileSync('./README.mustache', 'utf8');
const view = mustache.render(template, {operators, utilities});

fs.writeFileSync('./README.md', view, 'utf8');
