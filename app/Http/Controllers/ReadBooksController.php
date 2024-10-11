<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Book;
use App\Models\Genre;
use App\Models\Publisher;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Auth;


class ReadBooksController extends Controller
{
    public function GetReadBooks($userId) {
        $books = Book::with(['genres', 'publisher', 'userLike'])
            ->whereHas('readBooks', function($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->with(['rating' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }])
            ->get();

        return $books;
    }

    public function AddToReadBooks(Request $request) {
        $userId = Auth::user()->id;
        $bookId = $request->id;
        $book = Book::find($bookId);
        $book->readBooks()->attach($userId);
        return redirect()->back()->withSuccess('Book added to read books');
    }

    public function RemoveFromReadBooks(Request $request) {
        $userId = Auth::user()->id;
        $bookId = $request->id;
        $book = Book::find($bookId);
        $book->readBooks()->detach($userId);
        return redirect()->back()->withSuccess('Book removed from read books');
    }
}
