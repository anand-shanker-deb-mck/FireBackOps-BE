const returnApiTestTemplate = () => `const axios = require('axios');
const { makeAPICall,createOptions } = require('../index.js');
describe('makeAPICall',() => {
    it('should return response with get method', async () => {
        const mockEndpoint = '/api';
        const mockBody = null;
        const mockMethod = 'GET';
        const mockHeaders = null;
        const mockResponse = { data : {} };
        jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);
        const response = await makeAPICall(mockEndpoint,mockMethod,mockHeaders,mockBody);
        expect(response).toEqual(mockResponse.data);
    });
    it('should return with error with get method', async () => {
        const mockEndpoint = '/api';
        const mockBody = null;
        const mockMethod = 'GET';
        const mockHeaders = null;
        jest.spyOn(axios, 'get').mockImplementation(() => { throw new Error('error'); });
        const response = await makeAPICall(mockEndpoint,mockMethod,mockHeaders,mockBody);
        expect(response).toBe('error');
    });
    it('should return response with post method', async () => {
        const mockEndpoint = '/postapi';
        const mockBody = { "description": "hello"};
        const mockMethod = 'POST';
        const mockHeaders = null;
        const mockResponse = { data : {} };
        jest.spyOn(axios, 'post').mockResolvedValue(mockResponse);
        const response = await makeAPICall(mockEndpoint,mockMethod,mockHeaders,mockBody);
        expect(response).toEqual(mockResponse.data);
    });
    it('should return with error with post method', async () => {
        const mockEndpoint = '/postapi';
        const mockBody = { "description": "hello"};
        const mockMethod = 'POST';
        const mockHeaders = null;
        jest.spyOn(axios, 'post').mockImplementation(() => { throw new Error('error'); });
        const response = await makeAPICall(mockEndpoint,mockMethod,mockHeaders,mockBody);
        expect(response).toBe('error');
    });
    it('should return response with delete method', async () => {
        const mockEndpoint = '/deleteapi';
        const mockBody = { "description": "hello"};
        const mockMethod = 'DELETE';
        const mockHeaders = null;
        const mockResponse = { data : {} };
        jest.spyOn(axios, 'delete').mockResolvedValue(mockResponse);
        const response = await makeAPICall(mockEndpoint,mockMethod,mockHeaders,mockBody);
        expect(response).toEqual(mockResponse.data);
    });
    it('should return with error with delete method', async () => {
        const mockEndpoint = '/deleteapi';
        const mockBody = { "description": "hello"};
        const mockMethod = 'DELETE';
        const mockHeaders = null;
        jest.spyOn(axios, 'delete').mockImplementation(() => { throw new Error('error'); });
        const response = await makeAPICall(mockEndpoint,mockMethod,mockHeaders,mockBody);
        expect(response).toBe('error');
    });
});
describe('createOptions',() => {
    it('should return response with get method', async () => {
        const mockMethod = 'GET';
        const mockBody = null;
        const mockHeaders = { 'Authorization': 'Bearer 13264t72'};
        const response = createOptions(mockMethod,mockHeaders,mockBody);
        expect(response).toEqual({method: mockMethod, headers: mockHeaders, body: mockBody });
    });
    it('should return response with post method', async () => {
        const mockBody = { 'description': 'hello'};
        const mockMethod = 'POST';
        const mockHeaders = { 'Authorization': 'Bearer 13264t72'};
        const response = createOptions(mockMethod,mockHeaders,mockBody);
        expect(response).toEqual({method: mockMethod , headers: mockHeaders, body: mockBody });
    });
    it('should return response with delete method', async () => {
        const mockBody = { 'description': 'hello'};
        const mockMethod = 'DELETE';
        const mockHeaders = { 'Authorization': 'Bearer 13264t72'};
        const response = createOptions(mockMethod,mockHeaders,mockBody);
        expect(response).toEqual({method: mockMethod , headers: mockHeaders, body: mockBody });
    });
});
`;
module.exports = { returnApiTestTemplate };
