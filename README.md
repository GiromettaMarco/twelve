# Eleven

[![CodeQL](https://github.com/GiromettaMarco/twelve/actions/workflows/lint.yml/badge.svg)](https://github.com/GiromettaMarco/twelve/actions/workflows/lint.yml)
[![Tests](https://github.com/GiromettaMarco/twelve/actions/workflows/tests.yml/badge.svg)](https://github.com/GiromettaMarco/twelve/actions/workflows/tests.yml)
[![PHP Coverage](docs/php-coverage.svg)](https://github.com/GiromettaMarco/twelve/actions/workflows/tests.yml)

Example Laravel 12 application with React.

## Requirements

- PHP 8.4
- Composer
- Node 22
- pnpm

## Installation

Clone this repository:

```
git clone https://github.com/GiromettaMarco/twelve.git
```

Install composer and node packages:

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
php artisan migrate --seed
```

Run the dev server

```
pnpm run dev
```

## Minimum Sail configuration

This is the minimum system configuration to run this application in a development environment with Laravel Sail, starting from a fresh Ubuntu-24.04 installation.

### Update system packages

```
sudo apt-get update && sudo apt-get upgrade -y
```

### Git

```
sudo apt-get install git
```

```
git config --global user.name "Marco Girometta" && git config --global user.email girometta.marco@gmail.com
```

> **OPTIONAL**: you can disable Git hooks by creating the husky config file at `~/.config/husky/init.sh`, with the following content:
> ```
> export HUSKY=0
> ```

### SSH

Generate a new SSH key and don't use a passphrase if you want to use it with Visual Studio Code Source Control.

```
ssh-keygen -t ed25519 -C "girometta.marco@gmail.com"
```

Add the new SSH key to the ssh-agent

```
eval "$(ssh-agent -s)"
```

```
ssh-add ~/.ssh/id_ed25519
```

Add the public key into your github account

```
vim ~/.ssh/id_ed25519.pub
```

Copy the file content (leave vim with `ESC :q`) and paste it here: https://github.com/settings/ssh/new

Finally clone this repository:

```
git clone git@github.com:GiromettaMarco/twelve.git
```

When prompted answer "yes" to add github.com to the list of known hosts.

### PHP and Composer

This service provided by Laravel Herd will install php8.4, composer and the Laravel installer with no need for further configurations.

```
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
```

### Sail alias

Add a Laravel Sail alias for convenience

```
vim ~/.bashrc
```

Enter insert mode by pressing `i` and add this line at the end:

```
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

Save and exit with `ESC :wq`

### pnpm and Node.js

Install pnpm

```
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

Restart your shell

Install Node.js with pnpm env

```
pnpm env use --global 22
```

> **NOTE**: Node.js is required to run git hooks with husky.

### Install packages

Install composer and node packages.

> **NOTE**: pnpm installs dependencies in a global store which should always be on the same volume as the current project (in order to take advantage of hard links). Therefore, it is convenient to install pnpm packages from outside the container, when working in a development environment.

From the project root:

```
composer install
```

```
pnpm install
```

> **TIP**: you may open the project with Visual Studio Code by using `code .` from the project root.

### Environment configuration

Create a new `.env` file and fill "HOST" variables with docker services name (see .env.example).

> **OPTIONAL**: create a new `.env.dusk.local` file to configure the dusk environment.
>
> Fill `APP_KEY` environment variable later on.
>
> A new database named "testing" with full privileges for the sail user will be created when building the docker image for the first time.

### Docker

Install docker or enable it through Docker Desktop.

Run docker compose with sail

```
sail up -d
```

Generate a new application key

```
sail artisan key:generate
```

Run migrations and seeds

```
sail artisan migrate --seed
```

## Reference

- [Git - First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
- [Generating a new SSH key and adding it to the ssh-agent - GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [PHP Installer in seconds | php.new](https://php.new/)
- [Laravel Sail - Laravel 12.x - The PHP Framework For Web Artisans](https://laravel.com/docs/12.x/sail#configuring-a-shell-alias)
- [Symlinked `node_modules` structure | pnpm](https://pnpm.io/symlinked-node-modules-structure)
- [Store Settings | pnpm](https://pnpm.io/settings#store-settings)
- [How To | Husky](https://typicode.github.io/husky/how-to.html#for-a-gui-or-globally)
