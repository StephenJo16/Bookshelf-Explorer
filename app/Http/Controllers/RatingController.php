<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\LikedReviews;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RatingController extends Controller
{
    public function AddRating(Request $request) {
        $bookId = $request->book_id;
        $rating = $request->rating;
        $userId = auth()->user()->id;

        if ($rating == 0) {
            return redirect()->back()->withErrors(["rating" => "Give a rating!"]);
        }

        DB::table("ratings")->updateOrInsert(
            ["book_id" => $bookId, "user_id" => $userId],
            ["rating" => $rating, "created_at" => now(), "updated_at" => now()]
        );
        return redirect()->back()->with("success", "Ratings saved");
    }

    public function AddReview(Request $request) {
        $bookId = $request->book_id;
        $review = $request->review;
        $rating = $request->rating;
        $userId = auth()->user()->id;
        $hasSpoilers = $request->has_spoilers;
        $validator = Validator::make($request->all(), [
            'review' => "required|string|max:1000|min:10"
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors())->withInput();
        }

        $rating = ($rating == 0) ? null : $rating;

        DB::table('ratings')->updateOrInsert(
            ['book_id' => $bookId, 'user_id' => $userId],
            ['review' => $review, 'rating' => $rating, 'has_spoiler' => $hasSpoilers, 'created_at' => now(), 'updated_at' => now()]
        );
        return redirect()->back()->with("success", "Review saved");
    }

    public function DeleteRating(Request $request) {

        $id = $request->id;
        if ($id == null) {
            return redirect()->back()->withErrors(["id" => "Review not found"]);
        }
        Rating::find($id)->delete();
        return redirect()->back()->with("success", "Review deleted");
    }

    public function GetLikedReviews(Request $request) {
        $user = RegisteredUserController::GetUserProfile($request->username);
        if (!$user) {
            return redirect()->route('dashboard');
        }
        $userId = $user->id;
        $likedReviewIds = LikedReviews::where('user_id', $userId)->pluck('review_id');
        $reviews = Rating::with(['User', 'Book', 'liked'])
            ->whereIn('id', $likedReviewIds)
            ->withCount('likes')
            ->get();
        return Inertia::render('Profile/LikedReviews', [
            'reviews' => $reviews,
            'user' => $user
        ]);
    }

    public function GetUserReviews(Request $request) {
        $user = RegisteredUserController::GetUserProfile($request->username);
        $userId = $user->id;
        $reviews = Rating::with(['User', 'Book', 'liked'])
            ->where('user_id', $userId)
            ->where('review', '!=', null)
            ->withCount('likes')
            ->get();
        return Inertia::render('Profile/UserReviews', [
            'reviews' => $reviews,
            'user' => $user
        ]);
    }

    public function DeleteReview(Request $request) {
        $id = $request->id;
        if ($id == null) {
            return redirect()->back()->withErrors(["id" => "Review not found"]);
        }
        $rating = Rating::find($id);
        $rating->review = null;
        LikedReviews::where('review_id', $id)->delete();
        $rating->save();
        return redirect()->back()->with("success", "Review deleted");
    }

}
