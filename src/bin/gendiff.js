#!/usr/local/bin/node
// eslint-disable-next-line
import program from 'commander';
import packageData from '../../package.json';
import gendiff from '..';

program
  .version(packageData.version)
  .description(packageData.description)
  .option('-f, --format [type]', 'output format, available as plain or json')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
