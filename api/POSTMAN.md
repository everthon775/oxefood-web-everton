# Testando no Postman

Primeiro entre na pasta `api` e rode:

```bash
npm install
npm start
```

A API ficará em `http://localhost:3001`.

## Empresa

GET `http://localhost:3001/api/empresa`

GET `http://localhost:3001/api/empresa/1`

POST `http://localhost:3001/api/empresa`
Body > raw > JSON:

```json
{
  "nome": "Minha Empresa",
  "cnpj": "11.111.111/0001-11",
  "foneFixo": "(81) 3333-3333"
}
```

PUT `http://localhost:3001/api/empresa/1`

```json
{
  "nome": "Empresa Alterada",
  "cnpj": "22.222.222/0001-22",
  "foneFixo": "(81) 4444-4444"
}
```

DELETE `http://localhost:3001/api/empresa/1`

## Produto

GET `http://localhost:3001/api/produto`

GET `http://localhost:3001/api/produto/1`

POST `http://localhost:3001/api/produto`

```json
{
  "nome": "Feijão",
  "codigo": "002",
  "tipo": "Alimento"
}
```

PUT `http://localhost:3001/api/produto/1`

```json
{
  "nome": "Feijão Alterado",
  "codigo": "003",
  "tipo": "Alimento"
}
```

DELETE `http://localhost:3001/api/produto/1`

Os mesmos cinco métodos podem ser usados para `cliente` e `categoria`.
