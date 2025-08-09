# 🛠️ Solar Sim

Aplicativo desenvolvido para empresas do setor de energia solar, com o objetivo de facilitar a criação de kits personalizados para venda. Ele permite verificar a compatibilidade entre os kits disponíveis e as necessidades específicas de cada cliente, otimizando o processo de proposta comercial.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Laravel 12](https://laravel.com/) (PHP 8.3)
- [PostgreSQL 16](https://www.postgresql.org/)
- [Node.js 24](https://nodejs.org/)
- [React](https://reactjs.org/) com [Inertia.js](https://inertiajs.com/)
- [PHPUnit](https://phpunit.de/) para testes automatizados
- [Docker](https://www.docker.com/) para desenvolvimento e produção containerizados
- [GitHub Actions](https://github.com/features/actions) para integração e entrega contínua (CI/CD)

---

## 📦 Requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- PHP >= 8.3
- Composer
- Node.js >= 18 (recomendado 24)
- PostgreSQL >= 16
- NPM ou Yarn

Ou utilize Docker para rodar os containers de desenvolvimento

---

## ⚙️ Instalação

### Clone o repositório
```bash
git clone git@github.com:DilkerWinter/solar-sim-laravel.git
cd solar-sim-laravel
```

### Copie o arquivo de ambiente e configure
```bash
cp .env.example .env
cp docker-compose.yml.example docker-compose.yml
php artisan key:generate
```

### Suba os containers
```bash
docker compose up -d --build
```

### Execute as migrações
```bash
./dartisan migrate:fresh --seed
```

---

## ✅ Testes

Para rodar os testes com PHPUnit:

```bash
./dartisan test
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

Este projeto está sob a licença [MIT](.github/LICENSE).

---

## ✨ Autor

Desenvolvido por [Bruno Winter](https://github.com/DilkerWinter) 

---


## 🤖 Tecnologias
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)