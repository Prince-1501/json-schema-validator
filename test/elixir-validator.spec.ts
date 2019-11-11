import fs from "fs";
import ElixirValidator from "../src/elixir-validator";

describe("Elixir validator tests", () => {
    test("Empty Schema (empty object)", () => {
        const ingestValidator = new ElixirValidator([]);
        return ingestValidator.validate({}, {}).then( (data) => {
            expect(data).toBeDefined();
            expect(data.length).toBe(0);
        });
    });

    test("Attributes Schema", () => {
        let inputSchema = fs.readFileSync("examples/schemas/attributes-schema.json");
        let jsonSchema = JSON.parse(inputSchema.toString());

        let inputObj = fs.readFileSync("examples/objects/attributes.json");
        let jsonObj = JSON.parse(inputObj.toString());

        const elixirValidator = new ElixirValidator([]);

        return elixirValidator.validate(jsonSchema, jsonObj).then((data) => {
            expect(data).toBeDefined();
            expect(data.length).toBe(1);
            expect(data[0].message).toContain('should match format "uri"');
        });
    });


    test("BioSamples Schema - FAANG \'organism\' sample", () => {
        let inputSchema = fs.readFileSync("examples/schemas/biosamples-schema.json");
        let jsonSchema = JSON.parse(inputSchema.toString());

        let inputObj = fs.readFileSync("examples/objects/faang-organism-sample.json");
        let jsonObj = JSON.parse(inputObj.toString());

        const elixirValidator = new ElixirValidator([]);

        return elixirValidator.validate(jsonSchema, jsonObj).then((data) => {
            expect(data).toBeDefined();
            expect(data.length).toBe(0);
        });
    });

    test("Study Schema", () => {
        let inputSchema = fs.readFileSync("examples/schemas/submittables/study-schema.json");
        let jsonSchema = JSON.parse(inputSchema.toString());

        let inputObj = fs.readFileSync("examples/objects/study.json");
        let jsonObj = JSON.parse(inputObj.toString());
        const elixirValidator = new ElixirValidator([]);

        return elixirValidator.validate(jsonSchema, jsonObj).then((data) => {
            expect(data).toBeDefined();
            expect(data.length).toBe(2);
        });
    });
});