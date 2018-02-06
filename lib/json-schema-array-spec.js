const expect = require("chai").expect;
const JsonSchema = require("./json-schema");
const jsonSchemaTestSuite = require("./json-schema-test-suite");


describe("JSON Schema", () => {
  jsonSchemaTestSuite("items", "draft4");
  jsonSchemaTestSuite("maxItems", "draft4");
  jsonSchemaTestSuite("minItems", "draft4");
  jsonSchemaTestSuite("uniqueItems", "draft4");

  describe('a schema with a `tupleItems` keyword', () => {
    const schema = JsonSchema("#", `{
      "tupleItems": [
        { "type": "string" },
        { "type": "number" }
      ]
    }`);
    const validate = JsonSchema.validate(schema);

    it("should be true if the items match the schemas in order", () => {
      expect(validate(["foo", 4])).to.eql(true);
    });

    it("should be true if there are fewer items then the keyword specifies", () => {
      expect(validate(["foo"])).to.eql(true);
    });

    it("should not be true if one of items do not match", () => {
      expect(validate(["foo", "bar"])).to.eql(false);
    });

    it("should not be true if the items are not in the right order", () => {
      expect(validate([4, "foo"])).to.eql(false);
    });

    it("should be true if it is not an array", () => {
      expect(validate("foo")).to.eql(true);
    });
  });
});