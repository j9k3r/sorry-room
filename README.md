# sorry-room

Извинятельная комната (фото редактор)
## Project Setup back (django 4.3 - openvino,tensorflow,torch)
* список пакетов python
  + Django>=4.0,<4.3
  + djangorestframework>3.0, <4.0
  + pillow<10.2.0
  + ipython<8.22.0
  + gdown<2.3.0
  + ipywidgets<8.2.0
  + numpy<1.26.0
  + opencv-python<4.9.1.00
  + matplotlib<3.8.3
  + openvino<2023.4.0
  + torch<2.3.0
  + tensorflow<2.16.0
  + django-cors-headers<=4.3.1

Для сборки достаточно запустить docker-compose up -d в процессе сборки произойдет установка пакетов из requirements.txt итоговый образ весит 12.1гб

далее необходимо добавить папку [u2net_human_seg](https://disk.yandex.ru/d/ITh3fyNMPS171Q)  с моделью u2net_human_seg.pth (168мб) в /backend/django/vino/image_cleaner/model

имеет два основных метода 
  + post на localhost:8000/test/ для проверки cors
  + post на localhost:8000/person/ c обязательными параметрами "type = bgr", и полем для файла img_src

созданные файлы попадают в папку на сервере /backend/django/static

основано на:
* [openvino](https://docs.openvino.ai/2023.3/notebooks/205-vision-background-removal-with-output.html)
* [YOLO8](https://github.com/openvinotoolkit/openvino_notebooks/tree/main/notebooks/230-yolov8-optimization)
* [Background Removal Demo](https://github.com/openvinotoolkit/openvino_notebooks/tree/main/notebooks/205-vision-background-removal)

## Project Setup Front (vue 3 vite, pinia, fabric js)

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```