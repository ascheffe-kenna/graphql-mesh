// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: openapi-to-graphql
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

/* globals beforeAll, test, expect */

import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
import { GraphQLSchema, parse, validate } from 'graphql';
import { fetch } from 'cross-undici-fetch';

const oas = require('./fixtures/cloudfunction.json');

let createdSchema: GraphQLSchema;

beforeAll(async () => {
  const { schema } = await openAPIToGraphQL.createGraphQLSchema(oas, { fetch });
  createdSchema = schema;
});

test('Get response', async () => {
  const query = `mutation {
    mutationViewerBasicAuth (username: "test" password: "data") {
      postTestAction2 (payloadInput: {age: 27}) {
        payload
        age
      }
    }
  }`;
  // validate that 'limit' parameter is covered by options:
  const ast = parse(query);
  const errors = validate(createdSchema, ast);
  expect(errors).toEqual([]);
});
