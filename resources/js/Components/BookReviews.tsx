import { Books, Review, User } from "@/types";
import { useEffect, useState } from "react";
import ReviewCard from "./Cards/ReviewCard";
import ReviewModal from "./Modal/ReviewModal";

type BookDetailsProps = {
    book: Books;
    user: User;
    reviews: Review[];
}

const BookReviews = ({ book, user, reviews }: BookDetailsProps) => {

    const [showAddReviewModal, setShowAddReviewModal] = useState(false)

    const closeReviewModal = () => setShowAddReviewModal(false)
    const openReviewModal = () => setShowAddReviewModal(true)

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <p className="text-2xl font-bold">User Reviews</p>
                <div onClick={openReviewModal} className="flex gap-2 p-1 items-center cursor-pointer rounded-sm transition-all duration-200 hover:bg-gray-200">
                    <p className="text-blue-600 text-xl font-bold">+ Review</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {reviews.map(review => (
                    <ReviewCard key={review.id} review={review}/>
                ))}
            </div>
            <ReviewModal onClose={closeReviewModal} show={showAddReviewModal} book={book} user={user} />
        </div>
    );
}

export default BookReviews;
