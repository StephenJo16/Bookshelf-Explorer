import { Books } from "@/types";

const AdminBookCard = ({ book, className }: { book: Books, className: string }) => {
    return (
        <div key={book.id} className={"book-container max-h-80 p-4 bg-white rounded-md relative overflow-hidden hover:cursor-pointer " + className}>
            <img src={book.book_cover_url} alt="Book" className="w-full h-full rounded-md"/>
        </div>
    );
}

export default AdminBookCard;
