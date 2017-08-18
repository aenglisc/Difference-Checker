import fs from 'fs';
import gendiff from '../src';

describe('Config differences', () => {
  // wrong extension throws an error
  it('Invalid extension', () => {
    const errorFile = './__tests__/sample_files/erroneous/error.txt';
    expect(() => gendiff(errorFile, errorFile)).toThrowError();
  });

  // flat tests
  const expectedDiffFlat = fs.readFileSync('./__tests__/sample_files/expected/flat.txt', 'utf8');

  const samplesPathFlat = './__tests__/sample_files/flat/';

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

  it('Flat YAML/JSON', () => {
    expect(gendiff(oldYAMLFlat, newJSONFlat)).toBe(expectedDiffFlat);
  });

  it('Flat INI/INI', () => {
    expect(gendiff(oldINIFlat, newINIFlat)).toBe(expectedDiffFlat);
  });

  it('Flat INI/JSON', () => {
    expect(gendiff(oldINIFlat, newJSONFlat)).toBe(expectedDiffFlat);
  });

  // recursive tests
  const expectedDiffRec = fs.readFileSync('./__tests__/sample_files/expected/recursive.txt', 'utf8');

  const samplesPathRec = './__tests__/sample_files/recursive/';

  const oldJSONRec = `${samplesPathRec}json/before.json`;
  const newJSONRec = `${samplesPathRec}json/after.json`;

  const oldYAMLRec = `${samplesPathRec}yaml/before.yml`;
  const newYAMLRec = `${samplesPathRec}yaml/after.yml`;

  const oldINIRec = `${samplesPathRec}ini/before.ini`;
  const newINIRec = `${samplesPathRec}ini/after.ini`;

  it('Recursive JSON/JSON', () => {
    expect(gendiff(oldJSONRec, newJSONRec)).toBe(expectedDiffRec);
  });

  it('Recursive YAML/YAML', () => {
    expect(gendiff(oldYAMLRec, newYAMLRec)).toBe(expectedDiffRec);
  });

  it('Recursive YAML/JSON', () => {
    expect(gendiff(oldYAMLRec, newJSONRec)).toBe(expectedDiffRec);
  });

  it('Recursive INI/INI', () => {
    expect(gendiff(oldINIRec, newINIRec)).toBe(expectedDiffRec);
  });

  it('Recursive INI/JSON', () => {
    expect(gendiff(oldINIRec, newJSONRec)).toBe(expectedDiffRec);
  });
});
