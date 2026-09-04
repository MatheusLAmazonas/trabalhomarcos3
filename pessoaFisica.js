class DadosInvalidosError extends Error {
  constructor(erros) {
    super(Array.isArray(erros) ? erros.join("\n") : erros);
    this.name = "DadosInvalidosError";
    this.erros = Array.isArray(erros) ? erros : [erros];
  }
}

function calcularDigito(cpf, tamanho) {
  let soma = 0;
  let peso = tamanho;

  for (let i = 0; i < tamanho - 1; i++) {
    soma += Number(cpf[i]) * peso--;
  }

  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

function validarCPF(cpf) {
  const numero = String(cpf ?? "").replace(/\D/g, "");

  if (numero.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(numero)) return false;

  const d1 = calcularDigito(numero, 10);
  const d2 = calcularDigito(numero.slice(0, 10) + d1, 11);

  return Number(numero[9]) === d1 && Number(numero[10]) === d2;
}

function calcularIdade(dataNascimento, hoje = new Date()) {
  const [ano, mes, dia] = dataNascimento.split("-").map(Number);
  let idade = hoje.getFullYear() - ano;

  const aniversarioPassou =
    (hoje.getMonth() + 1 > mes) ||
    (hoje.getMonth() + 1 === mes && hoje.getDate() >= dia);

  if (!aniversarioPassou) idade--;
  return idade;
}

function validarDataNascimento(data) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data ?? ""))) return false;

  const [ano, mes, dia] = data.split("-").map(Number);
  const dataObj = new Date(ano, mes - 1, dia);

  if (
    dataObj.getFullYear() !== ano ||
    dataObj.getMonth() !== mes - 1 ||
    dataObj.getDate() !== dia
  ) return false;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return dataObj <= hoje && calcularIdade(data) <= 120;
}

function validarPessoaFisica(dados) {
  const erros = [];

  const nome = String(dados?.nome ?? "").trim();
  if (nome.length < 3 || nome.length > 80) {
    erros.push("Nome deve ter entre 3 e 80 caracteres.");
  }

  if (!/^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)+$/.test(nome)) {
    erros.push("Nome deve conter nome e sobrenome e usar apenas letras, espaço, apóstrofo ou hífen.");
  }

  if (!validarCPF(dados?.cpf)) {
    erros.push("CPF inválido.");
  }

  const email = String(dados?.email ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || (email.match(/@/g) || []).length !== 1) {
    erros.push("E-mail inválido.");
  }

  if (!validarDataNascimento(dados?.data_nascimento)) {
    erros.push("Data de nascimento inválida.");
  }

  if (dados?.possui_cnh === true) {
    const idade = calcularIdade(dados.data_nascimento);
    if (idade < 18) {
      erros.push("Quem possui CNH deve ter pelo menos 18 anos.");
    }
  }

  if (erros.length > 0) {
    throw new DadosInvalidosError(erros);
  }

  return true;
}

if (typeof module !== "undefined") {
  module.exports = {
    DadosInvalidosError,
    validarCPF,
    calcularIdade,
    validarDataNascimento,
    validarPessoaFisica
  };
}
