import { useState, useEffect } from 'react'

const ShowAll = () => {
    const [allBooks, setAllBooks] = useState([])
    useEffect(() => {
        const headers = {
            "content-type": "application/json"
        }
        fetch('http://localhost:3000/shop', { headers })
            .then(response => response.json())
            .then(response => {
                console.warn(response)
                const theBooks = response.map(book => {
                    return (
                        <li key={book._id}>
                            {book.title}
                        </li>
                    )
                })
                console.debug(theBooks)
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