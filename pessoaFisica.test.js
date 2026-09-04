const test = require("node:test");
const assert = require("node:assert/strict");

const {
  DadosInvalidosError,
  validarPessoaFisica
} = require("./pessoaFisica");

const pessoaValida = {
  nome: "João da Silva",
  cpf: "529.982.247-25",
  email: "joao@example.com",
  data_nascimento: "1990-05-20",
  possui_cnh: true
};

test("aceita cadastro válido", () => {
  assert.equal(validarPessoaFisica(pessoaValida), true);
});

test("rejeita nome muito curto", () => {
  assert.throws(
    () => validarPessoaFisica({ ...pessoaValida, nome: "Jo" }),
    DadosInvalidosError
  );
});

test("rejeita CPF inválido", () => {
  assert.throws(
    () => validarPessoaFisica({ ...pessoaValida, cpf: "111.111.111-11" }),
    DadosInvalidosError
  );
});

test("rejeita e-mail sem domínio válido", () => {
  assert.throws(
    () => validarPessoaFisica({ ...pessoaValida, email: "joao@" }),
    DadosInvalidosError
  );
});

test("rejeita data futura", () => {
  assert.throws(
    () => validarPessoaFisica({ ...pessoaValida, data_nascimento: "2099-01-01" }),
    DadosInvalidosError
  );
});

test("acumula múltiplos erros", () => {
  assert.throws(
    () => validarPessoaFisica({
      nome: "X",
      cpf: "11111111111",
      email: "email-invalido",
      data_nascimento: "2099-01-01",
      possui_cnh: true
    }),
    (erro) => erro instanceof DadosInvalidosError && erro.erros.length >= 4
  );
});
