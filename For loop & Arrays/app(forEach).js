const books = [{
    title: 'Good Omens',
    authors: ['Terry Pratchett', 'Neil Gaiman'],
    rating: 4.25
},
{
    title: 'BoneL The Complete Edition',
    authors: ['Jeff Smith'],
    rating: 4.42
},
{
    title: 'American Gods',
    authors: ['Neil Gaiman'],
    rating: 4.11
},
{
    title: 'A Gentleman in Moscow',
    authors: ['Amor Towles'],
    rating: 4.36
}
]

books.forEach(function (book, index) {
    console.log('index', index);
    console.log(book.title.toUpperCase());
});

for (let book of books) {
    console.log(book.title.toUpperCase());
}

for (let i = 0; i < books.length; i++) {
    console.log(books[i].title.toUpperCase());
}