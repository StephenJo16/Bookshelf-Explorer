import { Books } from "@/types"
import { calcRating } from "@/Utils/util"
import { router } from "@inertiajs/react"
import Overlay from "../UI/Overlay"
import "../../Styles/custom.css"

const BookCard = ({ book, className, displayRatings = true }: { book: Books, className: string, displayRatings?: boolean }) => {

    const handleClick = () => {
        console.log(book.id)
        router.visit(`/books/${book.id}`)
    }

    return (
        <div key={book.id} onClick={() => handleClick()} className={"book-container max-h-96 relative overflow-hidden hover:cursor-pointer " + className}>
            <img src={book.book_cover_url} alt="Book" className="w-full h-full"/>
            <Overlay>
                <p className="text-white text-center text-base sm:text-xl">{book.book_title}</p>
                <br />
                <p className="text-white text-center text-base sm:text-lg">Genre: {book.genres.map(genre => `${genre.genre_name}, `)}</p>
                <br />
                {book.ratings && displayRatings && <p className="text-white text-center text-base sm:text-lg">Rating: {calcRating(book)}/5</p>}
            </Overlay>
        </div>
    )
}

export default BookCard
