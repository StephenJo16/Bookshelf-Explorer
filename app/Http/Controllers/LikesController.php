<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikesController extends Controller
{
    public function LikeBook(Request $request) {
        $bookId = $request->book_id;
        $userId = auth()->user()->id;

        $book = Book::find($bookId);
        $book->likes()->attach($userId, ['created_at' => now(), 'updated_at' => now()]);
        return redirect()->back()->with("success", "Book liked");
    }

    public function UnlikeBook(Request $request) {
        $bookId = $request->book_id;
        $userId = auth()->user()->id;

        $book = Book::find($bookId);
        $book->likes()->detach($userId);
        return redirect()->back()->with("success", "Book unliked");
    }
}
