const createFoldersHelper = require('../createFolder.service.helper');
const { Configuration } = require('../../../models');

describe('Filter details service', () => {
  test('should return dependency strings ', async () => {
    const mockValue = {
      projectName: 'P1',
      routes: [
        {
          routeName: 'R1',
          configurations: [
            {
              componentType: 'Api',
              payload: {
                method: 'get',
              },
              sequence: 1,
              refName: 'source',
              dependencies: ['a', 'b', 'c'],
            }],
        }],
    };
    const mockParam = {
      projectName: 'P1',
      routes: [
        {
          routeName: 'R1',
          configurations: [
            {
              componentType: 'Api',
              payload: {
                method: 'get',
              },
              sequence: 1,
              refName: 'source',
              dependencies: [1, 2, 3],
            }],
        }],
    };

    const spyModel = jest.spyOn(Configuration, 'findAll').mockResolvedValue([{ refName: 'a', id: 1 }, { refName: 'b', id: 2 }, { refName: 'c', id: 3 }]);
    const returnValue = await createFoldersHelper.filterDetails(mockParam);
    expect(spyModel).toHaveBeenCalled();
    expect(returnValue).toEqual(mockValue);
  });
});
