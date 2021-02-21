<div align="center" style="margin-top: 20px">
  <a href="/"><img style="background-color: #202020" src="./src/shared/assets/logo.svg" height="120" /></a>
</p>
 <p align="center"><em>Repositório com a API do projeto proposto pela GoStack 11</em></p>
 <br>
</div>

## Como instalar
Será necessário ter o [nodejs]() instalado. Em sistemas linux, utilizando seu gerenciador de pacotes, pode-se fazer isso com `sudo {gerenciador} install nodejs`, por exemplo:

TODO - versionamento do node

```bash
sudo apt-get install nodejs
```
### Bancos de dados
Abra o diretório do repositório clonado e instale as dependências:
```
npm install
```
Também será necessário dispor dos bancos: `Postgres`, `MongoDB` e `Redis`. Pode-se fazer uso dos mesmos, através de suas imagens Dockers, com a criação de containers, para o ambiente de desenvolvimento:

```bash
docker run --name <nome> -e TZ=America/Sao_Paulo -e POSTGRES_PASSWORD=<senha> -p 5432:5432 -d postgres
```

```bash
docker run --name <nome> -p 27017:27017 -d -t mongo
```

```
docker run --name your-container-name -p 6379:6379 -d -t redis:alpine
```

### .env
Necessário também copiar o arquivo, .env.example e colocar as informações sensíveis para o arquivo .env:
```
APP_API_URL=http://localhost:3001
APP_WEB_URL=http://localhost:3000
APP_SECRET=<segredo>
```
Se estiver em modo de desenvolvimento, utilize o `localhost` e também não esqueça de setar o restante dos serviços externos.

### Migrations
Rodar migrations escritas para gerar tabelas no banco:
```
npm run typeorm migration:run
```

Exemplo de como criar uma migration:
```bash
npx typeorm migration:create -n <NomeMigration>
# ou
npm run typeorm migration:create -n <NomeMigration>
```

## Como rodar
Para iniciar o servidor de desenvolvimento:
```
npm run dev:server
```
Para buildar:
```
npm run build
```

## Documentação dos endpoints
Ela pode ser acessada em  `./openapi.yml` utilizando algum leitor do padrão OpenAPI 3.0, como por exemplo: https://editor.swagger.io/, ou o plugin Swagger Viewer para VSCode.
