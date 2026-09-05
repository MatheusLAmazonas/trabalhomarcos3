
const test = require("node:test");
const assert = require("node:assert/strict");

const { validarCPF } = require("./pessoaFisica");

test("aceita CPF válido com máscara", () => {
  assert.equal(validarCPF("529.982.247-25"), true);
});

test("aceita CPF válido sem máscara", () => {
  assert.equal(validarCPF("52998224725"), true);
});

test("rejeita CPF com dígitos repetidos", () => {
  assert.equal(validarCPF("11111111111"), false);
});

test("rejeita CPF com quantidade incorreta de dígitos", () => {
  assert.equal(validarCPF("123456789"), false);
});
