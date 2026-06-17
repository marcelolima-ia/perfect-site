# Site Perfect Cirurgia Plástica — site estático servido com nginx
FROM nginx:alpine

# Remove a página padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do site para o diretório servido pelo nginx
COPY . /usr/share/nginx/html

# Porta interna do nginx
EXPOSE 80

# nginx já inicia sozinho na imagem base
