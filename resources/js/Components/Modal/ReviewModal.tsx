import { Books, Review, User } from "@/types";
import { FormEventHandler, useState } from "react";
import Rating from '@mui/material/Rating';
import { useForm } from "@inertiajs/react";
import PrimaryButton from "../UI/PrimaryButton";
import TextArea from "../UI/TextArea";
import Modal from "../Modal";
import Checkbox from "../UI/Checkbox";

type ReviewModalProps = {
    book: Books;
    user: User;
    show: boolean;
    closeable?: boolean;
    onClose: CallableFunction;
}

const ReviewModal = ({ show, onClose, book, user }: ReviewModalProps) => {

    const [value, setValue] = useState<number | null>(book.user_rating ? book.user_rating.rating : 0);

    const { data, setData, post, errors, reset } = useForm({
        rating: value,
        book_id: book.id,
        user_id: user.id,
        review: book.user_review ? book.user_review.review : '',
        errors: '',
        has_spoilers: false,
    })

    const onSubmit: FormEventHandler = e => {
        e.preventDefault()
        post(route('reviews.add', { id: book.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                onClose()
            }
        })
    }

    console.log(book.user_rating)

    return (
        <Modal show={show} onClose={onClose}>
            <form className="p-6 flex flex-col items-start gap-3" onSubmit={onSubmit}>
                <p className="text-xl font-semibold">Add Review for {book.book_title}</p>
                <div className="flex flex-col gap-1">
                    <p className="text-lg">Your Rating</p>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue)
                            setData('rating', newValue)
                        }}
                        className="mb-2 border-2 border-gray-200 rounded-lg p-2"
                    />
                </div>
                <p className="text-lg">Your Review</p>
                <TextArea
                    id="review"
                    name="review"
                    value={data.review}
                    className="w-full h-24 resize-none mb-1"
                    isFocused={true}
                    onChange={(e) => setData('review', e.target.value)}
                />
                { errors.review && <p className="text-red-500">{errors.review}</p> }
                <label className="flex items-center">
                    <Checkbox
                        name="has_spoilers"
                        checked={data.has_spoilers}
                        onChange={(e) => setData('has_spoilers', e.target.checked)}
                    />
                    <span className="ms-2 text-md text-gray-600">Mark Spoilers</span>
                </label>
                <PrimaryButton>
                    Add Review
                </PrimaryButton>
            </form>
        </Modal>
    );
}

export default ReviewModal;
