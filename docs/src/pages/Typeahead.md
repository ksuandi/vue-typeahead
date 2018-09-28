# TypeAhead

The description for TypeAhead goes here.

### Example

```html
<template>
  <type-ahead :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']"/>
</template>
<script>
export default {}
</script>
<!-- component-demo.vue -->
```

### Props

| Name          | Type     | Default                | Required | Description                                                 |
| ------------- | -------- | ---------------------- | -------- | ----------------------------------------------------------- |
| `items`       | Array    |                        | yes      | Плоский массив или массив объектов                          |
| `isAsync`     | Boolean  | true                   |          | Показывать ли индикатор загрузки, если нет данных           |
| `minLength`   | Number   | 1                      |          | Минимальное количество символов для показа вариантов        |
| `limit`       | Number   | 4                      |          | Число показываемых вариантов                                |
| `loadingText` | String   | Loading...             |          | Текст индикатора загрузки (для l10n)                        |
| `getName`     | Function | `(item) => item`       |          | Функция позволяет указать, из какого поля брать данные      |
| `getImage`    | Function | `(item) => item.image` |          | Функция позволяет указать, из какого поля брать изображение |

### Events

| Name     | Return value   | Description                         |
| -------- | -------------- | ----------------------------------- |
| `input`  | String         | Возвращает текущую введенную строку |
| `select` | String, Object | Вовзвращает выбранный элемент       |
