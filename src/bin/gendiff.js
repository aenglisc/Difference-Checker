#!/usr/local/bin/node
import program from 'commander';
import json from '../../package.json';

program
  .version(json.version)
  .description(json.description)
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);

console.log('working');
