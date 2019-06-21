# Configuration environment

Данный репозиторий создан для облегчения работы с контроллерами и сервисами.

## Установка и настройка

Скачиваем [VsCode](https://code.visualstudio.com/) и устанавливаем следующие расширения:

* [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
* [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag)
* [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets)
* [IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
* [Russian - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-russian)

Затем клонируем данный репозиторий, заходим в него и выполняем

```bash
npm install
```

В системе должны быть установлены [node](https://nodejs.org/en/) и npm (ставится вместе c node).  

Для вашего удобства уже настроена проверка орфографии для русского и английского языков.

## Использование

* в папке src создаем файл с названием контроллера/сервиса и расширением .js (Button.js)
* копируем в него код из CMS
* редактируем и исправляем ошибки
* по окончанию копируем код обратно в CMS
