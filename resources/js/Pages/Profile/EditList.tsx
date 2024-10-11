import { Books, List, ListDetails, PageProps, User } from "@/types";
import ProfileLayout from "./ProfileLayout";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/UI/TextInput";
import TextArea from "@/Components/UI/TextArea";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import DangerButton from "@/Components/UI/DangerButton";
import InputLabel from "@/Components/UI/InputLabel";
import Dropdown from "@/Components/UI/Dropdown";
import { FormEventHandler, useEffect, useState } from "react";
import FilterDropdown from "@/Components/FilterDropdown";
import Checkbox from "@/Components/UI/Checkbox";
import { usePrivacy } from "@/Hooks/usePrivacy";
import SortableBooks from "@/Components/SortableBooks";
import SecondaryButton from "@/Components/UI/SecondaryButton";

type EditListProps = PageProps & {
    list: List;
    books: ListDetails[];
    user?: User;
}

const EditList = ({ auth, list, books, user = auth.user }: EditListProps) => {

    const { data, setData, patch, processing, errors, delete: destroy } = useForm({
        list_id: list.id,
        list_name: list.list_name,
        list_description: list.list_description,
        list_is_public: list.is_public,
        list_books: books,
    });

    const [listBooks, setListBooks] = useState<ListDetails[]>(books)

    const { privacyOptions, privacy, setPrivacy } = usePrivacy({ is_public: list.is_public })

    const handleSubmit: FormEventHandler = e => {
        e.preventDefault();
        console.log(data)
        patch(route('lists.update', { id: list.id }))
    }

    const handleDelete: FormEventHandler = e => {
        destroy(route('lists.delete', { id: list.id }))
    }

    const handleCancel: FormEventHandler = e => {
        e.preventDefault()
        history.back()
    }

    useEffect(() => {
        setData('list_is_public', privacy == 'Anyone - Public List' ? 1 : 0)
        console.log(privacy)
    }, [privacy])

    useEffect(() => {
        setData('list_books', listBooks)
    }, [listBooks])

    return (
        <ProfileLayout user={user} auth={auth.user}>
            <p className="text-2xl">Edit List</p>
            <form onSubmit={handleSubmit}>
                <div className="flex mt-4 gap-8 h-36">
                    <div className="flex flex-col gap-6 flex-1">
                        <div>
                            <InputLabel htmlFor="name" value="List Name" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.list_name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('list_name', e.target.value)}
                            />
                        </div>
                        <FilterDropdown
                            options={privacyOptions.map(option => option.label)}
                            value={privacy}
                            setvalue={setPrivacy}
                            includeAll={false}
                            fullWidth={true}
                        />
                    </div>
                    <div className="flex-1">
                        <InputLabel htmlFor="description" value="List Description" />
                        <TextArea
                            id="description"
                            name="description"
                            value={data.list_description}
                            className="w-full h-40 resize-none mt-1"
                            autoComplete="description"
                            onChange={(e) => setData('list_description', e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-16">
                    <p className="text-2xl">Books</p>
                    <SortableBooks books={listBooks} setBooks={setListBooks}/>
                    <div className="flex items-center w-full min-h-24 justify-center bg-white border border-gray-200 p-2 mt-2 cursor-pointer">
                        <p className="text-bold text-xl ">+ Add Books</p>
                    </div>
                </div>
                <div className="flex gap-2 mt-8 sm:gap-8">
                    <SecondaryButton onClick={handleCancel}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton>
                        Save List
                    </PrimaryButton>
                    <DangerButton onClick={handleDelete} type="button">
                        Delete List
                    </DangerButton>
                </div>
            </form>
        </ProfileLayout>
    );
}

export default EditList;
