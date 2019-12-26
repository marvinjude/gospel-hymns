api/v1/hymn/{number} - Hymn by number

```json
{
  "title": "Leave it There",
  "chorus": false,
  "verses": ["First", "Second verse", "Third"],
  "category": "Admonition"
}
```

api/v1/category/{categoryName} - All hymns in category

```json
{
  "hymns": [12, 23, 23]
}
```

api/v1/category - All categories

```json
{
  "categories": {
    "Admonition": [192, 23, 23, 34],
    "name": [192, 23, 23, 34]
  }
}
```

api/v1/search/{searchTerm} - Search hymn

```json
{
  "searchTerm": "Leave",
  "hymns": [
    {
      "title": "Leave its There",
      "chorus": false,
      "verses": ["First", "Second verse", "Third"],
      "category": "Admonition"
    },
    {
      "title": "Leave it Here",
      "chorus": "Take your burden to the lord and leave it there",
      "verses": ["First", "Second verse", "Third"],
      "category": "Admonition"
    }
  ]
}
```
