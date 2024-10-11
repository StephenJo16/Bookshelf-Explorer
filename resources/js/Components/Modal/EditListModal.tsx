import { useForm } from "@inertiajs/react";
import TextArea from "../UI/TextArea";
import TextInput from "../UI/TextInput";
import PrimaryButton from "../UI/PrimaryButton";
import Modal from "../Modal";
import { List } from "@/types";

type EditListModalProps = {
    list: List | null;
    show: boolean;
    closeable?: boolean;
    onClose: CallableFunction;
}

export const EditListModal = ({ list, show, closeable, onClose }: EditListModalProps) => {

    if (!show || list == null) {
        return null;
    }

    const { data, setData, post, errors, reset } = useForm({
        list_id: list.id,
        list_name: list.list_name,
        list_description: list.list_description
    });

    return (
        <Modal show={show} onClose={onClose}>
            <form className="p-6 flex flex-col items-center gap-2">
                <p className="text-xl font-semibold">Edit {list.list_name}</p>
                <p className="text-lg">List Name</p>
                <TextInput
                    id="name"
                    name="name"
                    value={data.list_name}
                    className="w-full mb-1"
                    onChange={(e) => setData('list_name', e.target.value)}
                />
                <p className="text-lg">List Description</p>
                <TextArea
                    id="description"
                    name="description"
                    value={data.list_description}
                    className="w-full h-24 resize-none mb-1"
                    isFocused={true}
                    onChange={(e) => setData('list_description', e.target.value)}
                />
                <PrimaryButton type="submit">
                    Update List
                </PrimaryButton>
            </form>
        </Modal>
    );
}
