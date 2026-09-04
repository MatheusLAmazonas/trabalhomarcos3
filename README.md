# Cadastro Pessoa Física — CI/CD

Projeto baseado no manual técnico da atividade de Integração CI/CD.

## Fluxo

Git Push → Testes Node.js → Build Docker → Docker Hub → Deploy SSH → Oracle Cloud VM

## Testes locais

```bash
node --test
```

## Build Docker

```bash
docker build -t cadastro-pessoa-fisica:latest .
```

## Executar localmente

```bash
docker run -d -p 8080:80 --name cadastro-app cadastro-pessoa-fisica:latest
```

Acesse:

```text
http://localhost:8080
```

## Secrets do GitHub

Configure em Settings → Secrets and variables → Actions:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `VM_HOST`
- `VM_USER`
- `VM_SSH_KEY`

## VM Oracle

Na VM Ubuntu, execute:

```bash
chmod +x setup.sh
./setup.sh
```

Após reconectar via SSH:

```bash
docker --version
docker ps
```

A porta 80/TCP também precisa estar liberada nas regras de entrada da VM/VCN da Oracle Cloud.

## Deploy

Qualquer push na branch `main` dispara o workflow `.github/workflows/deploy.yml`.
