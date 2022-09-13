/** @jest-environment node */
// Copyright CESSDA ERIC 2017-2022
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import fs from 'fs';
import path from 'path';
import Elasticsearch from '../../server/elasticsearch';
import { ApiResponse, Client } from '@elastic/elasticsearch/api/new';
import httpMocks from 'node-mocks-http';
import { mockStudy } from '../common/mockdata';
import { getJsonLd, getStudyModel } from '../../common/metadata';
import { ResponseError } from '@elastic/elasticsearch/lib/errors';

// Constants
const ejsTemplate = "server/views/index.ejs";
const requestParameters = {
  path: "/detail",
  query: { q: "test" }
};

// Mock setup
jest.mock('../../server/elasticsearch');
const mockedElasticsearch = Elasticsearch as jest.MockedClass<typeof Elasticsearch>;
const mockedGetStudy = jest.fn<ReturnType<InstanceType<typeof Elasticsearch>["getStudy"]>, never>();
mockedElasticsearch.mockImplementation(() => {
  return {
    client: jest.fn() as unknown as Client,
    getStudy: mockedGetStudy,
    getSimilars: jest.fn(),
    getTotalStudies: jest.fn()
  }
});

// Import the helper
import { checkBuildDirectory, Metadata, renderResponse } from '../../server/helper';

// Reset the mock after each test
beforeEach(() => mockedGetStudy.mockReset());

describe('helper utilities', () => {
  describe('renderResponse()', () => {
    it('should return a rendered response', async () => {
      const request = httpMocks.createRequest();
      const response = httpMocks.createResponse();

      await renderResponse(request, response, ejsTemplate);

      // Status should be 200, and the template should be set correctly.
      expect(response.statusCode).toBe(200);
      expect(response._getRenderView()).toBe(ejsTemplate);
      expect(response._getRenderData()).toEqual({ metadata: {}});
    });

    it('should return 406 when a client requests JSON-LD on pages that are not the detail page', async () => {
      const request = httpMocks.createRequest({
        headers: {
          accept: "application/ld+json"
        },
        path: "/"
      });
      const response = httpMocks.createResponse();

      await renderResponse(request, response, ejsTemplate);

      // Status code should be 406
      expect(response.statusCode).toBe(406);
    });

    it('should return 406 when a client requests an unsupported content type', async () => {
      const request = httpMocks.createRequest({
        headers: {
          accept: "application/ld+json"
        },
        ...requestParameters
      });
      const response = httpMocks.createResponse();

      await renderResponse(request, response, ejsTemplate);

      // Status code should be 406
      expect(response.statusCode).toBe(406);
    });

    it('should request metadata', async () => {
      const request = httpMocks.createRequest(requestParameters);
      const response = httpMocks.createResponse();

      mockedGetStudy.mockResolvedValue(mockStudy);
      await renderResponse(request, response, ejsTemplate);

      // Status code should be 200
      expect(response.statusCode).toBe(200);
      expect(mockedGetStudy).toBeCalledWith("test", "cmmstudy_en");
      
      // Assert fields of renderData are as expected
      const renderData = response._getRenderData() as Metadata;
      expect(renderData).toEqual({
        metadata: {
          creators: mockStudy.creators.join('; '),
          description: mockStudy.abstractShort,
          title: mockStudy.titleStudy,
          publisher: mockStudy.publisher.publisher,
          jsonLd: getJsonLd(getStudyModel({ _source: mockStudy })),
          id: mockStudy.id
        }
      });
    });

    it('should return 503 on Elasticsearch error', async () => {
      const request = httpMocks.createRequest(requestParameters);
      const response = httpMocks.createResponse();

      // Simulate Elasticsearch returning 500
      mockedGetStudy.mockRejectedValue(new ResponseError({ statusCode: 500 } as ApiResponse));

      await renderResponse(request, response, ejsTemplate);

      // Status code should be 503
      expect(response.statusCode).toBe(503);
      expect(mockedGetStudy).toBeCalledWith("test", "cmmstudy_en");
      expect(response._getRenderData()).toEqual({ metadata: {}});
    });

    it('should return 404 when Elasticsearch returns 404', async () => {

      const request = httpMocks.createRequest(requestParameters);
      const response = httpMocks.createResponse();

      // Simulate Elasticsearch returning 500
      mockedGetStudy.mockRejectedValue(new ResponseError({ statusCode: 404 } as ApiResponse));

      await renderResponse(request, response, ejsTemplate);

      // Status code should be 404
      expect(response.statusCode).toBe(404);
      expect(mockedGetStudy).toBeCalledWith("test", "cmmstudy_en");
      expect(response._getRenderData()).toEqual({ metadata: {}});
    });

    it('should return 404 when Elasticsearch returns nothing', async () => {
      const request = httpMocks.createRequest(requestParameters);
      const response = httpMocks.createResponse();

      // Simulate Elasticsearch returning nothing
      mockedGetStudy.mockResolvedValue(undefined);

      await renderResponse(request, response, ejsTemplate);

      // Status code should be 404
      expect(response.statusCode).toBe(404);
      expect(mockedGetStudy).toBeCalledWith("test", "cmmstudy_en");
      expect(response._getRenderData()).toEqual({ metadata: {}});
    });
  });

  describe('checkBuildDirectory()', () => {
    // Mock out process.exit() to prevent the process from exiting
    const mockExit = jest.spyOn(process, 'exit').mockImplementation((() => {}) as () => never);

    // Reset the mock before each run
    beforeEach(() => mockExit.mockClear());

    it('should proceed if ../dist exists', () => {
      // Ensure that the directory exists
      fs.mkdirSync(path.join(__dirname, '../../dist'));

      checkBuildDirectory();

      // Expect process.exit() to have not been called
      expect(mockExit).toBeCalledTimes(0);
    });

    it('should fail if ../dist does not exist', () => {
      // Ensure that the directory does not exist
      fs.rmSync(path.join(__dirname, '../../dist'), { recursive: true });

      checkBuildDirectory();

      // Expect the correct exit code
      expect(mockExit).toBeCalledWith(16);
    });

    // Restore the original process.exit() function
    afterAll(() => mockExit.mockRestore());
  });
});