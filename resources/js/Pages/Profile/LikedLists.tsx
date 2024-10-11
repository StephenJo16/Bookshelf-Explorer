import { LikedReview, PageProps, Review, List, User } from "@/types";
import Liked from "./Liked";
import ProfilePic from "@/Components/ProfilePic";
import { formatDate } from "@/Utils/util";
import BookPreview from "@/Components/BookPreview";
import ListCard from "@/Components/Cards/ListCard";

type LikedListsProps = PageProps & {
    lists: List[];
    user?: User;
}

const LikedLists = ({ auth, lists, user = auth.user }: LikedListsProps) => {
    console.log(lists)

    return (
        <Liked user={user} auth={auth.user}>
            {lists.map(list => (
                <ListCard list={list} key={list.id} />
            ))}
        </Liked>
    );
}

export default LikedLists;
