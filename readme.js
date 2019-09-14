#!/usr/bin/env node
const fs = require('fs');
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
const readFile = file => fs.readFileSync(file, 'utf8').replace('/\r/g', '').split('\n');

/**
 * Removes lines that start with import.
 *
 * @param {string[]} lines
 * @returns {string[]}
 */
const stripImports = lines => lines.filter(l => !l.startsWith('import')).filter(l => Boolean(l));

/**
 * Removes the "export declare " prefix from lines.
 *
 * @param {string[]} lines
 * @returns {string[]}
 */
const stripExports = lines => lines.map(l => l.replace(/^export declare /, ''));

/**
 * Extracts the function names
 *
 * @param {string[]} lines
 * @returns {string[]}
 */
const extractFunctionName = lines => lines
  .filter(l => l.startsWith('export declare function '))
  .map(l => l.replace(/^export declare function /, ''))
  .map(l => l.replace(/[^\w].*/, '').trim());

/**
 * Appends a blank line to the array.
 *
 * @param {string[]} lines
 * @returns {string[]}
 */
const appendBlankLine = lines => ([...lines, '']);

/**
 * Concat all the files into a single string.
 *
 * @param {string[]} files
 * @returns {string}
 */
const format = (files) => files
  .map(readFile)
  .map(stripImports)
  .map(stripExports)
  .map(appendBlankLine)
  .reduce((acc, next) => [...acc, ...next], [])
  .join('\n')
  .trim();

const functions = (files) => files;

const files = sort(findFiles('./src/operators', '.md'));
console.log(functions(files));

return;

/**
 * Operators
 *
 * @type {string}
 */
const operators = format(sort(findFiles('./dist/operators', '.ts')));

/**
 * Utilities
 *
 * @type {string}
 */
const utilities = format(sort(findFiles('./dist/utils', '.ts')));

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
const view = mustache.render(template, {operators, utilities});

/**
 * Writes the README.md file.
 */
fs.writeFileSync('./README.md', view, 'utf8');
