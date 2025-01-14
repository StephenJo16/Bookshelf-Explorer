import { Books, ListDetails } from "@/types"
import { ReactSortable } from "react-sortablejs"
import { formatDate } from "@/Utils/util"
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react"

type SortableBooksProps = {
    books: ListDetails[]
    setBooks: (books: ListDetails[]) => void
}

type ItemInterface = {
    id: number
    book: ListDetails
}

const SortableBooks = ({ books, setBooks }: SortableBooksProps) => {


    const [sortableBooks, setSortableBooks] = useState<ItemInterface[]>(books.map((book, index) => {
        return {
            id: book.book_id,
            book: book
        }
    }))

    const handleDelete = (id:number) => {
        const newBooks = sortableBooks.filter(book => book.id !== id)
        setSortableBooks(newBooks)
    }

    useEffect(() => {
        setBooks(sortableBooks.map(book => book.book))
    }, [sortableBooks])

    console.log(books)

    return (
        <ReactSortable
            list={sortableBooks}
            setList={setSortableBooks}
            animation={150}
            handle=".handle"
        >
            {sortableBooks.map((book, index) => (
                <div key={book.id} className="handle flex items-center justify-between bg-white border border-gray-200 p-2 mt-2">
                    <div className="flex items-center gap-4">
                        <img src={book.book.book.book_cover_url} alt={book.book.book.book_title} className="w-16 h-24" />
                        <div className="flex flex-col items-start">
                            <p className="text-lg font-semibold">{book.book.book.book_title}</p>
                            <p className="text-sm text-gray-500">{book.book.book.book_author}</p>
                            <p className="text-sm text-gray-500">Added on {formatDate(book.book.created_at)}</p>
                        </div>
                    </div>
                    <button className="mr-1 sm:mr-4" type="button" onClick={() => handleDelete(book.id)}>
                        <IoMdClose size={30}/>
                    </button>
                </div>
             ))}
        </ReactSortable>
        
    )
}

export default SortableBooks
