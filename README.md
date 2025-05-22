# 🛠️ Nome do Projeto

Descrição breve do projeto, explicando sua funcionalidade principal, público-alvo e tecnologias utilizadas.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Laravel 12](https://laravel.com/) (PHP 8.3)
- [PostgreSQL 16](https://www.postgresql.org/)
- [Node.js 24](https://nodejs.org/)
- [React](https://reactjs.org/) com [Inertia.js](https://inertiajs.com/)
- [PHPUnit](https://phpunit.de/) para testes automatizados

---

## 📦 Requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- PHP >= 8.3
- Composer
- Node.js >= 18 (recomendado 24)
- PostgreSQL >= 16
- NPM ou Yarn

---

## ⚙️ Instalação

### Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
### Instale as dependências do backend
```bash
composer install
```

### Copie o arquivo de ambiente e configure
```bash
cp .env.example .env
php artisan key:generate
```

### Configure o banco de dados PostgreSQL no arquivo .env
```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nome_do_banco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

### Execute as migrações
```bash
php artisan migrate
```

### Instale as dependências do frontend
```bash
npm install
```

### Compile os assets
```bash
npm run dev
```

---

## ✅ Testes

Para rodar os testes com PHPUnit:

```bash
php artisan test
# ou
vendor/bin/phpunit
```

---

## 🧠 Estrutura do Projeto

O projeto segue a arquitetura padrão Laravel com Inertia.js:

```
├── app/
├── bootstrap/
├── database/
├── public/
├── resources/
│   ├── js/         # Código React
│   └── views/      # Views blade (apenas para fallback)
├── routes/
│   └── web.php
├── tests/
└── .env
```

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---
## 🤖 Tecnologias
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
---
## ✨ Autor

Desenvolvido por [Bruno Winter](https://github.com/DilkerWinter) 🚀