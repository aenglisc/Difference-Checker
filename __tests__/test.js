import fs from 'fs';
import gendiff from '../src';

describe('Config differences', () => {
  const basePath = './__tests__/sample_files/';
  const samplesPathFlat = `${basePath}flat/`;
  const samplesPathNested = `${basePath}nested/`;

  // wrong extension returns an error
  it('Invalid extension', () => {
    const extErrorFilePath = `${basePath}erroneous/error.txt`;
    expect(gendiff(extErrorFilePath, extErrorFilePath)).toBe('.txt files are not supported');
  });

  // wrong format returns an error
  it('Invalid format', () => {
    const formatErrorFile = `${samplesPathFlat}json/before.json`;
    expect(gendiff(formatErrorFile, formatErrorFile, 'ee')).toBe('ee is not a valid format');
  });

  // wrong extensions and format returns an error
  it('Invalid extensions and format', () => {
    const oldErrorFilePath = `${basePath}erroneous/error.kek`;
    const newErrorFilepath = `${basePath}erroneous/error.lul`;

    const kek = '.kek files are not supported';
    const lul = '.lul files are not supported';
    const ee = 'ee is not a valid format';

    const e = `${kek}\n${lul}\n${ee}`;

    expect(gendiff(oldErrorFilePath, newErrorFilepath, 'ee')).toBe(e);
  });

  // non-existent files return an error
  it('File does not exist', () => {
    const pathExists = `${samplesPathFlat}json/before.json`;
    const pathDoesNotExist = `${basePath}erroneous/nosuchfile.json`;
    const e = `${pathDoesNotExist} does not exist`;
    expect(gendiff(pathExists, pathDoesNotExist)).toBe(e);
  });

  // flat tests
  const expectedDiffFlat = fs.readFileSync(`${basePath}expected/flat.txt`, 'utf8');

  const oldJSONFlat = `${samplesPathFlat}json/before.json`;
  const newJSONFlat = `${samplesPathFlat}json/after.json`;

  const oldYMLFlat = `${samplesPathFlat}yaml/before.yml`;
  const newYMLFlat = `${samplesPathFlat}yaml/after.yml`;

  const oldYAMLFlat = `${samplesPathFlat}yaml/before.yaml`;
  const newYAMLFlat = `${samplesPathFlat}yaml/after.yaml`;

  const oldINIFlat = `${samplesPathFlat}ini/before.ini`;
  const newINIFlat = `${samplesPathFlat}ini/after.ini`;

  it('Flat JSON/JSON', () => {
    expect(gendiff(oldJSONFlat, newJSONFlat)).toBe(expectedDiffFlat);
  });

  it('Flat YML/YML', () => {
    expect(gendiff(oldYMLFlat, newYMLFlat)).toBe(expectedDiffFlat);
  });

  it('Flat YAML/YAML', () => {
    expect(gendiff(oldYAMLFlat, newYAMLFlat)).toBe(expectedDiffFlat);
  });

  it('Flat INI/INI', () => {
    expect(gendiff(oldINIFlat, newINIFlat)).toBe(expectedDiffFlat);
  });

  it('Flat YML/JSON', () => {
    expect(gendiff(oldYMLFlat, newJSONFlat)).toBe(expectedDiffFlat);
  });

  it('Flat INI/JSON', () => {
    expect(gendiff(oldINIFlat, newJSONFlat)).toBe(expectedDiffFlat);
  });

  it('Flat INI/YML', () => {
    expect(gendiff(oldINIFlat, newYMLFlat)).toBe(expectedDiffFlat);
  });

  // nested tests
  const expectedDiffNested = fs.readFileSync(`${basePath}expected/nested.txt`, 'utf8');

  const oldJSONNested = `${samplesPathNested}json/before.json`;
  const newJSONNested = `${samplesPathNested}json/after.json`;

  it('Nested JSON/JSON', () => {
    expect(gendiff(oldJSONNested, newJSONNested)).toBe(expectedDiffNested);
  });

  // plain option tests
  const expectedDiffPlain = fs.readFileSync(`${basePath}expected/option_plain.txt`, 'utf8');

  const samplesPathPlain = `${basePath}option_plain/`;

  const oldPlain = `${samplesPathPlain}before.json`;
  const newPlain = `${samplesPathPlain}after.json`;

  it('Nested JSON/JSON -f plain', () => {
    expect(gendiff(oldPlain, newPlain, 'plain')).toBe(expectedDiffPlain);
  });

  // json option tests
  const expectedDiffJSON = fs.readFileSync(`${basePath}expected/option_json.json`, 'utf8');

  const samplesPathJSON = `${basePath}option_json/`;

  const oldJSON = `${samplesPathJSON}before.json`;
  const newJSON = `${samplesPathJSON}after.json`;

  it('Nested JSON/JSON -f json', () => {
    expect(gendiff(oldJSON, newJSON, 'json')).toBe(expectedDiffJSON);
  });
});
