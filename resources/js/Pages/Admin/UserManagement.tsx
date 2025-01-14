import AdminLayout from "@/Layouts/AdminLayout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/Components/UI/Table";
import { useState, useEffect } from "react";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import DangerButton from "@/Components/UI/DangerButton";
import { router } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import ProfilePic from "@/Components/ProfilePic";
import BanConfirmationModal from "@/Components/Modal/BanConfirmationModal";
import SecondaryButton from "@/Components/UI/SecondaryButton";

type UserManagementProps = PageProps & {
    users: User[];
}

const UserManagement = ({ auth, users }: UserManagementProps) => {

    const [searchedUsers, setUsers] = useState(users)
    const [search, setSearch] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User>(users[0])

    const onOpen = (user: User) => {
        setSelectedUser(user)
        setShowModal(true)
    }

    const onClose = () => {
        setShowModal(false)
    }

    useEffect(() => {
        setUsers(users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()) || user.username.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())))
    }, [search])

    return (
        <AdminLayout user={auth.user} header="User Management">
            <div className="flex mb-8 mt-1 px-2">
                <TextInput
                    placeholder="Search users"
                    className="w-full"
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {searchedUsers.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell className="flex items-center font-medium gap-4 text-gray-900">
                                <ProfilePic img={user.profile_pic_url} size={16}/>
                                <div>
                                    <div className="text-md mb-1">{user.name}</div>
                                    <div className="text-md text-gray-500">{user.username}</div>
                                </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <PrimaryButton className="mr-8" onClick={() => router.visit(`/admin/users/${user.username}`)}>Details</PrimaryButton>
                                {user.status == 0 ?
                                    <DangerButton onClick={() => onOpen(user)}>Unban</DangerButton>
                                    :
                                    <DangerButton onClick={() => onOpen(user)}>Ban</DangerButton>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <BanConfirmationModal show={showModal} onClose={setShowModal} user={selectedUser}/>
        </AdminLayout>
    );
}

export default UserManagement;
