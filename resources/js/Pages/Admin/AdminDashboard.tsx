import AdminLayout from "@/Layouts/AdminLayout";
import { Books } from "@/types";
import { BooksPageProps } from "@/types";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import DangerButton from "@/Components/UI/DangerButton";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "@/Components/Modal/DeleteConfirmationModal";
import { router } from "@inertiajs/react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/Components/UI/Table";

const AdminDashboard = ({ auth, books }: BooksPageProps) => {

    const [searchedBooks, setBooks] = useState(books)
    const [search, setSearch] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [selectedBook, setSelectedBook] = useState<Books>(books[0])

    const onOpen = (book: Books) => {
        setSelectedBook(book)
        setShowModal(true)
    }

    const onClose = () => {
        setShowModal(false)
    }

    const onEdit = (id: number) => {
        router.visit(`admin/edit-book/${id}`)
    }

    useEffect(() => {
        setBooks(books.filter(book => book.book_title.toLowerCase().includes(search.toLowerCase())))
    }, [search])

    return (
        <AdminLayout user={auth.user} header="Dashboard">
                <div className="flex mb-8 mt-1">
                    <TextInput
                        placeholder="Search books"
                        className="w-full"
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Cover</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Genres</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {searchedBooks.map(book => (
                            <TableRow key={book.id}>
                                <TableCell>{book.id}</TableCell>
                                <TableCell>
                                    <img src={book.book_cover_url} alt="" className="max-w-32"/>
                                </TableCell>
                                <TableCell>{book.book_title}</TableCell>
                                <TableCell>{book.book_author}</TableCell>
                                <TableCell>{book.genres.map(genre => genre.genre_name).join(', ')}</TableCell>
                                <TableCell>
                                    <PrimaryButton className="mb-6 mr-4" onClick={() => onEdit(book.id)}>
                                        Edit
                                    </PrimaryButton>
                                    <DangerButton onClick={() => onOpen(book)}>
                                        Delete
                                    </DangerButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <DeleteConfirmationModal show={showModal} onClose={onClose} book={selectedBook}/>
        </AdminLayout>
    );
}

export default AdminDashboard;
