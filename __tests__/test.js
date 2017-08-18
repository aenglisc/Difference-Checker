import gendiff from '../src';

describe('Config differences', () => {
  const expectedDiff =
  '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';

  const samplesPathFlat = './__tests__/sample_files/flat/';

  const oldJSONFlat = `${samplesPathFlat}json/before.json`;
  const newJSONFlat = `${samplesPathFlat}json/after.json`;

  const oldYAMLFlat = `${samplesPathFlat}yaml/before.yml`;
  const newYAMLFlat = `${samplesPathFlat}yaml/after.yml`;

  const oldINIFlat = `${samplesPathFlat}ini/before.ini`;
  const newINIFlat = `${samplesPathFlat}ini/after.ini`;
/*
  const samplesPathRec = './__tests__/sample_files/recursive/';

  const oldJSONRec = `${samplesPathRec}json/before.json`;
  const newJSONRec = `${samplesPathRec}json/after.json`;

  const oldYAMLRec = `${samplesPathRec}yaml/before.yml`;
  const newYAMLRec = `${samplesPathRec}yaml/after.yml`;

  const oldINIRec = `${samplesPathRec}ini/before.ini`;
  const newINIRec = `${samplesPathRec}ini/after.ini`;
*/
  it('JSON/JSON', () => {
    expect(gendiff(oldJSONFlat, newJSONFlat)).toBe(expectedDiff);
  });

  it('YAML/YAML', () => {
    expect(gendiff(oldYAMLFlat, newYAMLFlat)).toBe(expectedDiff);
  });

  it('YAML/JSON', () => {
    expect(gendiff(oldYAMLFlat, newJSONFlat)).toBe(expectedDiff);
  });

  it('INI/INI', () => {
    expect(gendiff(oldINIFlat, newINIFlat)).toBe(expectedDiff);
  });

  it('INI/JSON', () => {
    expect(gendiff(oldINIFlat, newJSONFlat)).toBe(expectedDiff);
  });

  it('Invalid extension', () => {
    const errorFile = './__tests__/sample_files/erroneous/error.txt';
    expect(() => gendiff(errorFile, errorFile)).toThrowError();
  });
});
