<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Dashboard');
    }

    public function showAccount()
    {
        return Inertia::render('User/AccountSettings');
    }

    public function updateAccount(Request $request)
    {
        $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|max:255',
        ]);

        $request->user()->update($request->only('username', 'email'));

        return response()->json(['success' => 'Account updated successfully.']);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'newPassword' => 'required|min:8',
        ]);

        $user = $request->user();

        $user->update([
            'password' => Hash::make($request->newPassword),
        ]);

        return response()->json(['success' => 'Password updated successfully.']);
    }
}
