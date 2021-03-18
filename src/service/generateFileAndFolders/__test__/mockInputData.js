const inputJsonData = {
  projectName: 'generatedFolder',
  routes: [
    {
      routeName: 'flight',
      method: 'GET',
      configuration: [
        {
          type: 'API',
          payload: {
            endpoint: 'http://demo1852771.mockable.io/ibibo',
            method: 'GET',
            nodeModules: {
              lodash: '^4.5.6',
              eslint: '1.1.1',
            },
          },
          refName: 'getIbiboPrice',
          sequenceNumber: 2,
          dependencies: [],
        },
        {
          type: 'API',
          payload: {
            endpoint: 'http://demo1852771.mockable.io/trivago',
            method: 'GET',
            nodeModules: { lodash: '^4.5.6', axios: '^1.2.3' },
          },
          refName: 'getTrivagoPrice',
          sequenceNumber: 1,
          dependencies: [],
        },
        {
          type: 'MAPPER',
          payload: {
            code: 'return getTrivagoPrice < getIbiboPrice ? getTrivagoPrice :  getIbiboPrice',
            nodeModules: {
              lodash: '^4.5.6',
              axios: '^1.2.3',
              express: '^4.17.1',
              'fs-extra': '^9.1.0',
            },
          },
          refName: 'flightsCostMapper',
          sequenceNumber: 3,
          dependencies: ['getTrivagoPrice', 'getIbiboPrice'],
        },
      ],
    },
    {
      routeName: 'bus_stops',
      method: 'GET',
      configuration: [
        {
          type: 'API',
          payload: {
            endpoint: 'http://demo1852771.mockable.io/ibibo',
            method: 'GET',
            nodeModules: {
              lodash: '^4.5.6',
              eslint: '1.1.1',
            },
          },
          dependencies: [],
          refName: 'getIbiboPrice',
          sequenceNumber: 2,
        },
        {
          type: 'API',
          payload: {
            endpoint: 'http://demo1852771.mockable.io/trivago',
            method: 'GET',
            nodeModules: { lodash: '^4.5.6', axios: '^1.2.3' },
          },
          dependencies: [],
          refName: 'getRadisonPrice',
          sequenceNumber: 1,
        },
        {
          type: 'CUSTOM_MAPPER_SHORTEST_PATH',
          payload: {
            implementation: 'const customMapper = (source, destination) =>  source < destination ? source :  destination',
            signature: {
              source: 'getIbiboSource',
              destination: 'getRadisonSource',
            },
            nodeModules: {
              lodash: '^4.5.6',
              eslint: '1.1.1',
            },
          },
          dependencies: ['getRadisonSource', 'getIbiboSource'],
          refName: 'customHotelCostMapper',
          sequenceNumber: 3,
        },
      ],
    },
  ],
};

module.exports = { inputJsonData };
