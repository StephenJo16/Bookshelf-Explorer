import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Books, Genres, Publishers } from "@/types";
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import BookSlider from '@/Components/BookSlider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "../Styles/custom.css";
import BookCard from '@/Components/Cards/BookCard';

type DashboardProps = PageProps & {
    recommendations: Books[];
    recentlyViewed: Books[];
    topRated: Books[];
    mostLiked: Books[];
};

export default function Dashboard({ auth, recommendations, recentlyViewed, topRated, mostLiked }: DashboardProps) {

    useEffect(() => console.log(mostLiked), [])

    return (
        <MainLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Welcome back, {auth.user ? auth.user.name : 'Guest'}</div>
                    </div>
                    <br />
                    <div className='bg-white p-8 shadow-sm sm:rounded-lg'>
                        <p className='text-3xl font-semibold text-gray-800'>Recommendations</p>
                        <br />
                        <BookSlider books={recommendations}/>
                    </div>
                    <br />
                    <div className='bg-white p-8 shadow-sm sm:rounded-lg'>
                        <p className='text-3xl font-semibold text-gray-800'>Top Rated</p>
                        <br />
                        <BookSlider books={topRated}/>
                    </div>
                    <br />
                    <div className='bg-white p-8 shadow-sm sm:rounded-lg'>
                        <p className='text-3xl font-semibold text-gray-800'>Most Liked</p>
                        <br />
                        <BookSlider books={mostLiked}/>
                    </div>
                    <br />
                    <div className='bg-white p-8 shadow-sm sm:rounded-lg'>
                        <p className='text-3xl font-semibold text-gray-800'>Recently Viewed</p>
                        <br />
                        <BookSlider books={recentlyViewed}/>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
