import fs from 'fs';
import gendiff from '../src';

describe('Config differences', () => {
  // wrong extension throws an error
  it('Invalid extension', () => {
    const errorFile = './__tests__/sample_files/erroneous/error.txt';
    expect(gendiff(errorFile, errorFile)).toBe('.txt files are not supported');
  });

  const basePath = './__tests__/sample_files/';

  // flat tests
  const expectedDiffFlat = fs.readFileSync(`${basePath}expected/flat.txt`, 'utf8');

  const samplesPathFlat = `${basePath}flat/`;

  const oldJSONFlat = `${samplesPathFlat}json/before.json`;
  const newJSONFlat = `${samplesPathFlat}json/after.json`;

  const oldYAMLFlat = `${samplesPathFlat}yaml/before.yml`;
  const newYAMLFlat = `${samplesPathFlat}yaml/after.yml`;

  const oldINIFlat = `${samplesPathFlat}ini/before.ini`;
  const newINIFlat = `${samplesPathFlat}ini/after.ini`;

  it('Flat JSON/JSON', () => {
    expect(gendiff(oldJSONFlat, newJSONFlat)).toBe(expectedDiffFlat);
  });

  it('Flat YAML/YAML', () => {
    expect(gendiff(oldYAMLFlat, newYAMLFlat)).toBe(expectedDiffFlat);
  });

  it('Flat INI/INI', () => {
    expect(gendiff(oldINIFlat, newINIFlat)).toBe(expectedDiffFlat);
  });

  it('Flat YAML/JSON', () => {
    expect(gendiff(oldYAMLFlat, newJSONFlat)).toBe(expectedDiffFlat);
  });

  it('Flat INI/JSON', () => {
    expect(gendiff(oldINIFlat, newJSONFlat)).toBe(expectedDiffFlat);
  });

  // nested tests
  const expectedDiffNested = fs.readFileSync(`${basePath}expected/nested.txt`, 'utf8');

  const samplesPathNested = `${basePath}nested/`;

  const oldJSONNested = `${samplesPathNested}json/before.json`;
  const newJSONNested = `${samplesPathNested}json/after.json`;

  const oldYAMLNested = `${samplesPathNested}yaml/before.yml`;
  const newYAMLNested = `${samplesPathNested}yaml/after.yml`;

  const oldININested = `${samplesPathNested}ini/before.ini`;
  const newININested = `${samplesPathNested}ini/after.ini`;

  it('Nested JSON/JSON', () => {
    expect(gendiff(oldJSONNested, newJSONNested)).toBe(expectedDiffNested);
  });

  it('Nested YAML/YAML', () => {
    expect(gendiff(oldYAMLNested, newYAMLNested)).toBe(expectedDiffNested);
  });

  it('Nested INI/INI', () => {
    expect(gendiff(oldININested, newININested)).toBe(expectedDiffNested);
  });

  it('Nested YAML/JSON', () => {
    expect(gendiff(oldYAMLNested, newJSONNested)).toBe(expectedDiffNested);
  });

  it('Nested INI/JSON', () => {
    expect(gendiff(oldININested, newJSONNested)).toBe(expectedDiffNested);
  });

  // plain option tests
  const expectedDiffPlain = fs.readFileSync(`${basePath}expected/option_plain.txt`, 'utf8');

  const samplesPathPlain = `${basePath}option_plain/`;

  const oldPlain = `${samplesPathPlain}before.json`;
  const newPlain = `${samplesPathPlain}after.json`;

  // wrong format throws an error
  it('Invalid format', () => {
    expect(gendiff(oldPlain, newPlain, 'ee')).toBe('ee is not a proper format');
  });

  it('Nested JSON/JSON Plain', () => {
    expect(gendiff(oldPlain, newPlain, 'plain')).toBe(expectedDiffPlain);
  });

  // json option tests
  const expectedDiffJSON = fs.readFileSync(`${basePath}expected/option_json.json`, 'utf8');

  const samplesPathJSON = `${basePath}option_json/`;

  const oldJSON = `${samplesPathJSON}before.json`;
  const newJSON = `${samplesPathJSON}after.json`;

  it('Nested JSON/JSON JSON', () => {
    expect(gendiff(oldJSON, newJSON, 'json')).toBe(expectedDiffJSON);
  });
});
