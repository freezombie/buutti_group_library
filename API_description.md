`post /users/add`

data fields

```
{
    "name": "",
    "email": "",
    "password": String,
    "role": ,
    "borrow_history: [],
    "borrowed_books: [],
}
```

#### Returns

```
{
    "name": "",
    "email": "",
    "registration_date": <date>,
    "id": <mongo generated unique ID>,
    "role": "",
    "borrowed": [],
    "borrowHistory": []
}
```

`get /users/allUsers`

#### Returns

```
All registered users.
```

`put /users/edit`

data fields

```
{
     email,
     newName,
     newPassword,
}
```

#### Returns

406
```
{
    error: Name only contains whitespace (ie. spaces, tabs or line breaks).
    error: Password only contains whitespace (ie. spaces, tabs or line breaks).
}
```
202
```
{
    Name changed.
    New password saved.
}
```

`get /book/`

data fields

```
{
    ISBN
}
```

#### Returns
200
```
    isbn,
    title,
    author,
    published,
    pages,
    description,
```

404
```
No book found by ISBN.
```

`get /books/`

#### Returns
```
All registered books.
```

`get /book/search/`

data fields
```
{
    ISBN
}
```

#### Returns
```
    isbn,
    title,
    author,
    published,
    pages,
    description,
```

`put /book/`

data fields
```
{
    "isbn": "",
    "newInfo": {}
}
```

#### Returns
200
```
Book updated.
```

404
```
No book found by ISBN.
```

500
```
You must present us with some new info.
```

`delete /book/`

data fields
```
{
    "isbn": ""
}
```

#### Returns
200
```
Book by ISBN: {isbn} deleted succesfully.
```

500
```
Something went wrong.
```

`delete /book (copy)`

data fields
```
{
    "isbn":
    "copy_id":
}
```

#### Returns
200
```
Removed copy (if it existed) by _id:
```

`post /book/reserve`

data fields
```
{
    "reserverId": "",
    "isbn": "",
    "copy_id": "" 
}

```

#### Returns
404
```
No book found by ISBN:
No user found by ID:
No copy found by ID:
```

200
```
Reservation made.
```

`delete /user`

data fields
```
{
    "email": ""
}

```

#### Returns
500
```
User doesn't exist.
```

200
```
User deleted succesfully
```

`get /book/search`

data fields
```
{
    "title": ""
    OR
    "isbn": ""
    OR
    "author": ""
}
```

#### Returns
404
```
No matches found.
```

200
```
Search result
```
