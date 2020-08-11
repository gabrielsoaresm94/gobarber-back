<div align="center" style="margin-top: 20px">
  <a href="/"><img src="./src/shared/assets/logo.svg" height="120" /></a>
</p>
 <p align="center"><em>Repositório com a API do projeto proposto pela GoStack 11</em></p>

![style](https://badgen.net/badge/eslint/airbnb/ff5a5f?icon=airbnb)
![prettier](https://img.shields.io/badge/Prettier@-2.0.5-informational?logo=Prettier)
![husky](https://img.shields.io/badge/husky@-4.2.3-informational)
</div>

## Como instalar
Será necessário ter o [nodejs]() instalado. Em sistemas linux, utilizando seu gerenciador de pacotes, pode-se fazer isso com `sudo {gerenciador} install nodejs`, por exemplo:
```bash
sudo apt-get install nodejs
```

Abra o diretório do repositório clonado e instale as dependências:
```
npm install
```
Também será necessário dispor dos bancos: `Postgres`, `MongoDB` e `Reddis`. Pode-se fazer uso dos mesmos, através de suas imagens Dockers, com a criação de containers, para o ambiente de desenvolvimento:

```bash
docker run --name <nome> -e TZ=America/Sao_Paulo -e POSTGRES_PASSWORD=<senha> -p 5432:5432 -d postgres
```

### .env
Necessário também copiar o arquivo, .env.example e colocar as informações para:
```
APP_API_URL=http://localhost:3001
APP_WEB_URL=http://localhost:3000
APP_SECRET=<segredo>
```
Se estiver em modo de desenvolvimento e também setar o restante dos serviços externos.

## Como rodar
Para iniciar o servidor de desenvolvimento:
```
npm run dev:server
```
Para buildar:
```
npm run build
```
