import { useEffect, useState } from "react"
import ShowBook from "./ShowBook"

const ShowAll = () => {
    const [allBooks, setAllBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])

    useEffect(() => {
        const req = new Request(
            'http://localhost:3000/shop', {
            headers: {
                "content-type": "application/json"
            }
        }
        )

        fetch(req)
            .then(res => res.json())
            .then(data => {
                // console.log(data.length)
                setAllBooks(data)
                setFilteredBooks(data)
            })
            .catch(err => console.error(err))
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value

        const filtered = allBooks.filter(book => {
            return (
                book.title.toLowerCase().includes(value.toLowerCase()) || book.author.toLowerCase().includes(value.toLowerCase()) || book.price.toString().includes(value)
            )
        })
        setFilteredBooks(filtered)
    }

    return (
        <>
            <input type="text"
                onChange={handleSearch}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
            <p>Books found: {filteredBooks.length}</p>
            <div className="flex flex-row flex-wrap justify-around gap-y-8">
                {filteredBooks.map(book => {
                    return (
                        <ShowBook key={book._id} book={book} />
                    )
                }
                )}
            </div>
        </>
    )
}

export default ShowAll