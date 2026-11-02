# Skypro.Music

Учебный проект Skypro.Music на Next.js, React и TypeScript.

## Требования

- Node.js 20.9 или новее (рекомендуется актуальная LTS-версия).
- npm.

## Установка и запуск в Windows / VS Code

1. Распакуйте архив проекта в удобную папку.
2. Откройте в VS Code именно папку `skypro_music` — ту, в которой находятся `package.json`, `src` и `public`.
3. Откройте терминал VS Code: **Terminal → New Terminal**.
4. Установите зависимости:

   ```powershell
   npm install
   ```

5. Запустите приложение:

   ```powershell
   npm run dev
   ```

6. Откройте в браузере адрес `http://localhost:3000`.
7. Чтобы остановить сервер, нажмите `Ctrl + C` в терминале.

Если порт 3000 занят, Next.js предложит другой порт — откройте адрес, который будет показан в терминале.

## Проверка перед Pull Request

В терминале из корня проекта выполните:

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

Все три команды должны завершиться без ошибок. Затем отдельно проверьте страницы `/`, `/signin` и `/signup` в браузере.

## Ветки и Pull Request

Работайте в отдельной ветке, например `homework-1`:

```powershell
git switch -c homework-1
git add .
git commit -m "Complete Skypro Music homework 1"
git push -u origin homework-1
```

После отправки ветки откройте репозиторий на GitHub. Нажмите **Compare & pull request**, проверьте, что PR направлен из `homework-1` в основную учебную ветку (обычно `develop`, если именно она используется в репозитории), добавьте описание и нажмите **Create pull request**.
