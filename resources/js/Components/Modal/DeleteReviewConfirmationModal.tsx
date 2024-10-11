import Modal from "../Modal";
import { Books, Review } from "@/types";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "../UI/PrimaryButton";
import DangerButton from "../UI/DangerButton";
import { FormEventHandler } from "react";

type DeleteReviewConfirmationModalProps = {
    show: boolean;
    onClose: CallableFunction;
    review: Review | null;
}

const DeleteReviewConfirmationModal = ({ show, onClose, review }: DeleteReviewConfirmationModalProps) => {

    const { post, errors, processing, reset, delete:deleteBook } = useForm({
        errors: ''
    })

    if (!review) return null;

    const onSubmit: FormEventHandler = e => {
        e.preventDefault()
        deleteBook(route('admin.review.delete', { id: review.id }), {
            preserveScroll: true,
            onSuccess: () => window.location.reload(),
        })
    }

    return (
        <Modal show={show} onClose={onClose}>
            <form className="p-6" onSubmit={onSubmit}>
                <p className="text-xl text-red-600 mb-2">Delete Review</p>
                <p className="text-xl mb-2">{review.review}</p>
                <p className="text-gray-500">Are you sure you want to delete this review?</p>
                <div className="flex justify-end gap-4 mt-4">
                    <PrimaryButton onClick={() => onClose()} type="button">Cancel</PrimaryButton>
                    <DangerButton>Delete</DangerButton>
                </div>
            </form>
        </Modal>
    );
}

export default DeleteReviewConfirmationModal;
