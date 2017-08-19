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
  const expectedDiffNested = fs.readFileSync('./__tests__/sample_files/expected/nested.txt', 'utf8');

  const samplesPathNested = './__tests__/sample_files/nested/';

  const oldJSONNested = `${samplesPathNested}json/before.json`;
  const newJSONNested = `${samplesPathNested}json/after.json`;

  const oldYAMLNested = `${samplesPathNested}yaml/before.yml`;
  const newYAMLNested = `${samplesPathNested}yaml/after.yml`;

  const oldININested = `${samplesPathNested}ini/before.ini`;
  const newININested = `${samplesPathNested}ini/after.ini`;

  it('nested JSON/JSON', () => {
    expect(gendiff(oldJSONNested, newJSONNested)).toBe(expectedDiffNested);
  });

  it('nested YAML/YAML', () => {
    expect(gendiff(oldYAMLNested, newYAMLNested)).toBe(expectedDiffNested);
  });

  it('nested INI/INI', () => {
    expect(gendiff(oldININested, newININested)).toBe(expectedDiffNested);
  });

  it('nested YAML/JSON', () => {
    expect(gendiff(oldYAMLNested, newJSONNested)).toBe(expectedDiffNested);
  });

  it('nested INI/JSON', () => {
    expect(gendiff(oldININested, newJSONNested)).toBe(expectedDiffNested);
  });
});
