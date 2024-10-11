<?php

namespace App\Http\Controllers;

use App\Models\Following;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowingController extends Controller
{
    public function FollowUser(Request $request) {
        $followerId = Auth::id();
        $followingId = $request->input('id');
        $newFollower = new Following();
        $newFollower->follower_id = $followerId;
        $newFollower->following_id = $followingId;
        $newFollower->save();
        return redirect()->back();
    }

    public function UnfollowUser(Request $request) {
        $followerId = Auth::id();
        $followingId = $request->input('id');
        Following::where('follower_id', $followerId)->where('following_id', $followingId)->delete();
        return redirect()->back();
    }
}
