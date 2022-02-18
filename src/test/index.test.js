require('module-alias/register')
const winston = require('winston')
const assert = require('assert')
const express = require('express')
const { createServer } = require('http')

require('dotenv').config()
require('@app/service/logger')
require('@app/service/redis')

const startApolloServer = require('@app/graphql')
let server = null

beforeAll(async () => {
    server = await startApolloServer()
})


describe('Winston Log', () => {
    it('Starts the apollo server', async () => {
        const result = await server.executeOperation({
            query: 'query Query {test}'
        });
        expect(result.data?.test).toBe('Hello world')
    })
})
