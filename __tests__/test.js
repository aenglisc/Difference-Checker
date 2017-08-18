import gendiff from '../src';

describe('Config differences', () => {
  const samplesPath = './__tests__/sample_files/';
  const expectedDiff =
  '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';

  it('JSON/JSON', () => {
    const oldJSON = `${samplesPath}json/before.json`;
    const newJSON = `${samplesPath}json/after.json`;
    expect(gendiff(oldJSON, newJSON)).toBe(expectedDiff);
  });

  it('YAML/YAML', () => {
    const oldYAML = `${samplesPath}yaml/before.yml`;
    const newYAML = `${samplesPath}yaml/after.yml`;
    expect(gendiff(oldYAML, newYAML)).toBe(expectedDiff);
  });

  it('YAML/JSON', () => {
    const oldYAML = `${samplesPath}yaml/before.yml`;
    const newJSON = `${samplesPath}json/after.json`;
    expect(gendiff(oldYAML, newJSON)).toBe(expectedDiff);
  });

  it('INI/INI', () => {
    const oldINI = `${samplesPath}ini/before.ini`;
    const newINI = `${samplesPath}ini/after.ini`;
    expect(gendiff(oldINI, newINI)).toBe(expectedDiff);
  });

  it('INI/JSON', () => {
    const oldINI = `${samplesPath}ini/before.ini`;
    const newJSON = `${samplesPath}json/after.json`;
    expect(gendiff(oldINI, newJSON)).toBe(expectedDiff);
  });

  it('Invalid extension', () => {
    const file1 = `${samplesPath}erroneous/error.txt`;
    const file2 = `${samplesPath}erroneous/error.txt`;
    expect(() => gendiff(file1, file2)).toThrowError();
  });
});
