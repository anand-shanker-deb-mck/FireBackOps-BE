const apiTemplate = require('./apiTemplate');
const mapperTemplate = require('./mapperTemplate');

describe('api test', () => {
  it('should return api template as string', () => {
    const returnApiTemplate = apiTemplate.returnApiTemplate();
    expect(typeof (returnApiTemplate)).toBe('string');
  });
});

describe('mapper test', () => {
  it('should return mapper template as string', () => {
    const returnMapperTemplate = mapperTemplate.returnMapperTemplate(['getTrivagoPrice', 'getIbiboPrice'], 'return getTrivagoPrice < getIbiboPrice ? getTrivagoPrice :  getIbiboPrice', 'flightsCostMapper');
    expect(typeof (returnMapperTemplate)).toBe('object');
  });
});
