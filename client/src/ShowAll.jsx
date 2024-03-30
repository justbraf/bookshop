import { useState, useEffect } from 'react'

const ShowAll = () => {
    const [allBooks, setAllBooks] = useState([])
    useEffect(() => {
        const options = {
            headers: { "content-type": "application/json" },
            }
            fetch('http://localhost:3000/shop', { options })
                .then(response => response.json())
                .then(result => {
                    console.warn(result)
                    const theBooks = result.map(book => {
                        return (
                            <li key={book._id}>
                                {book.title} by {book.author}
                            </li>
                        )
                    })
                    console.debug(theBooks)
                    // setBooksLoaded(true)
                    setAllBooks(theBooks)
                })
                .catch(err => console.error(err))
    }, [])

    return (
        <>
            <h1>All Books</h1>
            <div className="card">
                <p>
                    {allBooks}
                    {/* {theBooks} */}
                    {/* {console.log(books)} */}
                </p>
            </div>
        </>
    )
}


export default ShowAll