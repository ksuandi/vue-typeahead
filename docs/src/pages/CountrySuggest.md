# CountrySuggest

The description for CountrySuggest goes here.

### Example

```html
<template>
    <country-suggest @select="onSelect"/>
</template>

<script>
export default {
  methods: {
    onSelect (item) {
      console.log(item);
    }
  }
}
</script>
<!-- component-demo.vue -->
```

### Props

| Name   | Type             | Default | Required | Description                                                                      |
| ------ | ---------------- | ------- | -------- | -------------------------------------------------------------------------------- |
| `url`  | String           |         |          | API (default `https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;flag`) |
| `name` | String, Function | `name`  |          | Позволяет указать, из какого поля брать название страны                          |
| `flag` | String, Function | `flag`  |          | Позволяет указать, из какого поля брать флаг                                     |

### Events

| Name     | Return value   | Description                  |
| -------- | -------------- | ---------------------------- |
| `select` | String, Object | Возвращает выбранный элемент |
