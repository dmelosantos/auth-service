const AWS = require('aws-sdk-mock');
const { importBackup, exportBackup } = require('../../../src/api/users');

const sampleJwt = 'eyJraWQiOiJKZUltOW1IdTB3dGt2RGFsd2NGUlVwbGFkNDNkSUFhVWVOUXE5MlwvXC9jNU09IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjYTU3ZTY5OS1mYzY2LTRiMWQtYjlhNy1kZDVlZmVkZjk2MGIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfaUdkYjhyV2xNIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6ImNhNTdlNjk5LWZjNjYtNGIxZC1iOWE3LWRkNWVmZWRmOTYwYiIsImF1ZCI6IjdnMzExcGMxc3ExMDBwbzNvNGY4N3V0dW9yIiwiZXZlbnRfaWQiOiJkOWViYzljNS0yYjA3LTRlM2ItODgxNy1kYjIxYzA2MWU3MzQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU2OTE4MzkzNCwicGhvbmVfbnVtYmVyIjoiKzU1MzE5NTM4MzYzNSIsImV4cCI6MTU2OTE4NzUzNCwiaWF0IjoxNTY5MTgzOTM0LCJlbWFpbCI6ImRhbmllbG1lbG9zQGdtYWlsLmNvbSJ9.doQ2KMyFZvVqkAVShTreOVwNiDWM72tc3NF_U9Q7qAL75F1PqffrbLZFMR-agQSVBPAq8lL0J8czagVV7cgHP623BK7eFlXui1Qh5l1rDt1iPnX62FJeeKKlM6tU4AyOOFxUTLLloOD3eUrLqNOKMUzcCyKJ3qCgK9dl6sUIfy-F0GSIe6jP3V1YJF1TWpn8sWvGLsUcMifg449atxj36SaFbfSnFYhT-wnrx_qz6W3ZmFNjzMSEhz3oT2iAZKBhx7DQ-rsufun_jDt3IFlWtu27sJAqjpavOvXbHe7RIf8y9hDWviPZWgALserTzziP61RslUDmg_koO2EFHFipUQ';
const backupFixture = require('../../fixtures/userBackup.json');

process.env.SCHEMA_VERSION = 67;

describe('Branch tests to simulate error flows', () => {
  beforeAll(() => {
    AWS.mock('DynamoDB.DocumentClient', 'put', () => {
      throw new Error('error');
    });
    AWS.mock('DynamoDB.DocumentClient', 'query', () => {
      throw new Error('error');
    });
  });

  afterEach(() => {
    delete process.env.BUCKET;
    delete process.env.REGION;
  });

  it('Should fail on dynamo and receive an treated error', async () => {
    const result = await importBackup();
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
  });

  it('Should fail on dynamo and receive an treated error', async () => {
    const event = {
      body: backupFixture,
      headers: {
        Authorization: sampleJwt,
      },
    };
    const result = await importBackup(event);
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
  });

  it('Should fail to export an backup on dynamo', async () => {
    const event = {
      headers: {
        Authorization: sampleJwt,
      },
    };
    const result = await exportBackup(event);
    expect(result.statusCode).toBe(500);
  });
});
