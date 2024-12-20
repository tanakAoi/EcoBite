<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);

        return Inertia::render('Admin/UserList', [
            'usersData' => $users
        ]);
    }

    public function show($id)
    {
        $user = User::find($id);

        return Inertia::render('Admin/UserShow', [
            'user' => $user
        ]);
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Admin/UserEdit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'username' => 'required|string',
            'email' => 'required|email',
            'role' => 'required|string',
        ]);

        $user = User::find($id);

        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->role = $request->input('role');
        $user->save();

        
        session()->flash('type', 'success');
        session()->flash('message', 'User updated successfully!');

        return redirect()->route('admin.user.index');
    }
}

