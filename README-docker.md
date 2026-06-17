# Como testar o site com Docker

Site estático da **Perfect Cirurgia Plástica** servido com nginx em um container.

## Pré-requisito
Ter o **Docker Desktop** instalado e aberto (Windows/Mac) ou Docker Engine (Linux).
Download: https://www.docker.com/products/docker-desktop/

## Subir o site (forma mais fácil)

Abra o terminal **dentro desta pasta** e rode:

```bash
docker compose up -d
```

Depois acesse no navegador:

```
http://localhost:8080
```

Pronto — o site inteiro estará rodando para testes.

## Parar o site

```bash
docker compose down
```

## Atualizar após mudar arquivos do site

Como os arquivos são copiados para dentro da imagem, ao alterar o site rode:

```bash
docker compose up -d --build
```

---

## Alternativa sem docker-compose (só Docker)

```bash
# construir a imagem
docker build -t perfect-site .

# rodar o container
docker run -d -p 8080:80 --name perfect-site perfect-site
```

Acesse `http://localhost:8080`. Para parar: `docker rm -f perfect-site`.

## Mudar a porta
Se a porta 8080 estiver ocupada, edite o `docker-compose.yml` e troque
`"8080:80"` por, por exemplo, `"3000:80"` — aí o acesso vira `http://localhost:3000`.
