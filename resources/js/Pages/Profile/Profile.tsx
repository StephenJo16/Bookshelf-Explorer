import { PageProps, User, Books, RatingCount } from "@/types";
import ProfileLayout from "./ProfileLayout";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import RatingBar from "@/Components/UI/RatingBar";
import BookSlider from "@/Components/BookSlider";
import BookPreview from "@/Components/BookPreview";
import { Link } from 'react-router-dom'

type ProfileProps = PageProps & {
    recentlyLiked: Books[];
    readList: Books[];
    ratings: RatingCount[];
    user?: User;
}

const Profile = ({ auth, recentlyLiked, readList, ratings, user = auth.user }: ProfileProps) => {

    useEffect(() => {
        setPercentages(arrangeRatingData())
    }, [])

    const [percentages, setPercentages] = useState<{ rating: number; ratingCount: number }[]>([]);

    const arrangeRatingData = () => {
        let totalCount = 0;
        const result = [];

        ratings.forEach(rating => {
            totalCount += rating.ratingCount;
        });

        for (let i = 1; i <= 5; i++) {
            const existingRating = ratings.find(rating => rating.rating === i);
            const ratingCount = existingRating ? existingRating.ratingCount : 0;
            ratingCount == 0 ? result.push({ rating: i, ratingCount }) : result.push({ rating: i, ratingCount: (ratingCount / totalCount) * 100 });
        }

        return result;
    };

    return (
        <ProfileLayout auth={auth.user} user={user}>
            <div className='shadow-sm sm:rounded-lg'>
                <p className='text-3xl font-semibold text-gray-800'>Recently Liked</p>
                <br />
                <BookSlider books={recentlyLiked}/>
            </div>
            <br />
            <div className="shadow-sm sm:rounded-lg flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                    <p className='text-2xl font-semibold text-gray-800 mb-4'>Readlist</p>
                    <BookPreview books={readList} />
                </div>
                <div className="flex-1">
                    <p className='text-2xl font-semibold text-gray-800 mb-4'>Ratings</p>
                    {percentages.length > 0 &&
                        <div className="flex-col items-start">
                            <RatingBar percentage={percentages[4]} />
                            <RatingBar percentage={percentages[3]} />
                            <RatingBar percentage={percentages[2]} />
                            <RatingBar percentage={percentages[1]} />
                            <RatingBar percentage={percentages[0]} />
                        </div>
                    }
                </div>
            </div>
        </ProfileLayout>
    );
}

export default Profile;
