# Eleven

[![CodeQL](https://github.com/GiromettaMarco/twelve/actions/workflows/lint.yml/badge.svg)](https://github.com/GiromettaMarco/twelve/actions/workflows/lint.yml)
[![Tests](https://github.com/GiromettaMarco/twelve/actions/workflows/tests.yml/badge.svg)](https://github.com/GiromettaMarco/twelve/actions/workflows/tests.yml)
[![PHP Coverage](badges/php-coverage.svg)](https://github.com/GiromettaMarco/twelve/actions/workflows/tests.yml)

Example Laravel 12 application with React.

## Installation

Clone this repo:

```
git clone https://github.com/GiromettaMarco/twelve.git
```

Install composer and npm packages:

```
composer install
```

```
pnpm i
```

Write a new `.env` file, then generate a new key:

```
php artisan key:generate
```

Run migrations

```
php artisan migrate
```

Run the dev server and register a new user from the application itself:

```
pnpm run dev
```
