# 4种方法处理嵌套对象取值

```js
const macAyres = {
  tours: {
    nearMe: {
      sanFrancisco: {
        date: 'Sun Oct 27',
        location: 'The Regency Ballroom',
        cost: '30.00',
      },
    },
  }
}
```

## 1. Ternary Operator to Check for null/undefined

```js
const concertCity = macAyres.tours.nearMe.sanJose
const concertLocation = concertCity ? concertCity.location : undefined;
```

```js
const concertLocation = (macAyres.tours &&
macAyres.tours.nearMe &&
macAyres.tours.nearMe.sanJose) ? macAyres.tours.nearMe.sanJose.location : undefined;
```

## 2. Oliver Steele’s Nested Object Access Pattern

```js
const concertLocation = (macAyres.tours.nearMe.sanJose || {}).location;
```

## 3. Array Reduce

```js
// Data Structure for recap
const macAyres = {
  tours: {
    nearMe: {
      sanFrancisco: {
        date: 'Sun Oct 27',
        location: 'The Regency Ballroom',
        cost: '30.00',
      },
    },
  }
}
const paths = ['tours', 'nearMe', 'sanJose', 'location'];
const location = paths.reduce((object, path) => {
    return (object || {})[path]; // Oliver Steele's pattern
}, macAyres)
```

## 4. Try/Catch Helper Function With ES6 Arrow Function

```js
// Code Snippet taken from the post
function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

// use it like this
getSafe(() => obj.a.lot.of.properties);

// or add an optional default value
getSafe(() => obj.a.lot.of.properties, 'nothing');
```

## A 参考阅读

- [4 Ways to Safely Access Nested Objects in Vanilla Javascript](https://medium.com/better-programming/4-ways-to-safely-access-nested-objects-in-vanilla-javascript-8671d09348a)