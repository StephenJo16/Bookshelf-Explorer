import { Books } from "@/types";
import { router } from "@inertiajs/react";

const SearchCard = ({ book }: { book: Books }) => {

    const handleClick = () => {
        console.log(book.id)
        router.visit(`/books/${book.id}`)
    }

    return (
        <div className="flex gap-4 border-b-2 border-gray-200 py-4">
            <div className='w-32 h-48 cursor-pointer' onClick={handleClick}>
                <img src={book.book_cover_url} alt="Book" className="object-fit w-full h-full" />
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <p className="text-xl md:text-2xl font-extrabold cursor-pointer" onClick={handleClick}>{book.book_title}</p>
                <p className="line-clamp-3">{book.book_description}</p>
                <p>Written by {book.book_author}</p>
            </div>
        </div>
    );
}

export default SearchCard;
