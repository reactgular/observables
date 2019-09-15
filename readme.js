#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

/**
 * Finds all the files in a path.
 *
 * @param {string} startPath Path to search for files.
 * @param {string} ext File extension to match.
 * @returns {string[]} Array of file names.
 */
const findFiles = (startPath, ext) => fs.readdirSync(startPath)
  .filter(file => file.endsWith(ext))
  .map(file => `${startPath}/${file}`);

/**
 * Sorts an array and returns the modified array.
 *
 * @param {Array} arr
 * @returns {Array}
 */
const sort = (arr) => (arr.sort(), arr);

/**
 * Reads the contents of a file and returns an array of each line.
 *
 * @param {string} file
 * @returns {string[]}
 */
const readFile = file => fs.readFileSync(file, 'utf8').replace(/\r/g, '');

/**
 * Removes lines that start with import.
 *
 * @param {string[]} lines
 * @returns {string[]}
 */
// const stripImports = lines => lines.filter(l => !l.startsWith('import')).filter(l => Boolean(l));

/**
 * Removes the "export declare " prefix from lines.
 *
 * @param {string[]} lines
 * @returns {string[]}
 */
// const stripExports = lines => lines.map(l => l.replace(/^export declare /, ''));

/**
 * Extracts the function names
 *
 * @param {string[]} lines
 * @returns {string[]}
 */
// const extractFunctionName = lines => lines
//   .filter(l => l.startsWith('export declare function '))
//   .map(l => l.replace(/^export declare function /, ''))
//   .map(l => l.replace(/[^\w].*/, '').trim());

/**
 * Appends a blank line to the array.
 *
 * @param {string[]} lines
 * @returns {string[]}
 */
// const appendBlankLine = lines => ([...lines, '']);

/**
 * Concat all the files into a single string.
 *
 * @param {string[]} files
 * @returns {string}
 */
// const format = (files) => files
//   .map(readFile)
//   .map(stripImports)
//   .map(stripExports)
//   .map(appendBlankLine)
//   .reduce((acc, next) => [...acc, ...next], [])
//   .join('\n')
//   .trim();

/**
 * Converts the filename to the function name.
 *
 * @param {string} fileName
 * @returns {string}
 */
const fileToName = fileName => path.basename(fileName)
  .replace(/\.md$/, '')
  .replace(/-\w/g, (a, b) => (a[1] + '').toUpperCase());

/**
 * Creates an object for each feature found in a directory. A feature is a TypeScript file with a
 * matching Markdown file.
 *
 * @param {string[]} files
 * @param {string} up
 * @returns {Array<{file: string, name:string, url: string, content: string}>}
 */
const features = (files, up) => files
  .map(file => ({
    id: fileToName(file).toLowerCase(),
    file,
    name: fileToName(file),
    url: 'https://github.com/reactgular/observables/blob/master/' + file.replace(/\.md$/, '.ts'),
    up,
    content: readFile(file)
  }));

/**
 * Slices up the array into chunks
 *
 * @param {Array} arr
 * @param {number} size
 * @param {any} def
 * @returns {Array}
 */
function chunk(arr, size = 3, def = undefined) {
  const t = [];
  const defs = Array(size).fill(def);
  for (let i = 0, j = arr.length; i < j; i += size) {
    const s = arr.slice(i, i + size);
    t.push([...s, ...defs].slice(0, size));
  }
  return t;
}

/**
 * Generates the table of contents structure.
 *
 * @param {string[]} names
 * @param {number} size
 * @returns {Array<{row:Array<{name:string, separator: boolean}>}>}
 */
function toc(names, size) {
  const separator = true;
  const nameLast = names.map(name => ({name, separator}));
  const chunks = chunk(nameLast, size, {name: '', separator});
  const markLastTrue = c => c.map((b, i) => ({...b, separator: i !== size - 1}));
  return chunks.map(c => ({row: markLastTrue(c)}));
}

const operators = features(sort(findFiles('src/operators', '.md')), 'operators');
const utilities = features(sort(findFiles('src/utils', '.md')), 'utilities');

/**
 * Defines a section that details all the features for that section.
 *
 * @param {Array<{file: string, name:string, url: string, content: string}>} features
 * @param {string} name
 * @param {string} description
 */
function contents(features, name, description) {
  return {
    name,
    description,
    toc: toc(features.map(s => s.name), 4),
    features
  };
}

const sections = [
  contents(operators, 'Operators', 'Here is a list of observable operators that you can use from this library.'),
  contents(utilities, 'Utilities', 'Here is a list of utility functions that you can use from this library.')
];
// console.log(sections);

/**
 * Markdown template
 * @type {string}
 */
const template = fs.readFileSync('./README.mustache', 'utf8');

/**
 * Rendered markdown
 *
 * @type {string}
 */
const view = mustache.render(template, {sections});
// console.log(view);

/**
 * Writes the README.md file.
 */
fs.writeFileSync('./README.md', view, 'utf8');
