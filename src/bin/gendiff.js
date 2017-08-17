#!/usr/local/bin/node
import program from 'commander';
import json from '../../package.json';
import gendiff from '..';

program
  .version(json.version)
  .description(json.description)
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
