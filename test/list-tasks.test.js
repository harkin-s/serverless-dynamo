const { expect } = require("chai");
const { it, describe, beforeEach } = require("mocha")
const { stub } = require("sinon")
const database = require("../build/dynamo-connection");
const { listAllTasks } = require("../build/list-tasks")

let dbStub = stub(database, 'getConnection')



describe('List task tests', async function () {


    it('Should return server error when db connection fails ', async function () {
        dbStub.rejects();

        const result = await listAllTasks();

        expect(result.statusCode).to.equal(500);

    })

    it("Should return 200 when no erorr is thrown", async function () {
        const creator = "Joe"
        const testParams = {}
        dbStub.resolves({
            scan: function () {
                return {
                    promise: function () {
                        return {
                            Items: ["taskOne"],
                            LastEvaluatedKey: undefined
                        };
                    }
                }
            }
        });

        const result = await listAllTasks(creator);
        expect(result.statusCode).to.equal(200)

    })
})