<?php

namespace App\Http\Controllers;

use App\Mail\UserCreated;
use App\Models\User;
use App\Notifications\EmailVerification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class UserController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $this->validateUserRequest($request);

        $data = $request->input();
        $data['password'] = Hash::make($request->password);
        $data['verification_token'] = User::generateVerificationCode();

        $user = User::create($data);

        return $this->showOne($user, 'Following user added successfully', 201);
    }



    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function upload() {
        $this->uploadAudio();
    }

    public function verify(User $user, $token) {

        if($user->vrified) {
            return $this->showOne(['message'=> 'This email already has beedn verified'], 200);
        }

        $user = User::where('verification_token', $token)->firstOrFail();

        $user->verified = true;
        $user->verification_token = null;
        $user->email_verified_at = Carbon::now();
        $user->save();

        return $this->showMessage('The account has  been verified successfully', 200);
    }

    public function resend(User $user) {

        if($user->verified) {
            return $this->showMessage('This user has already been verified', 409);
        }else {
            $user->notify(new EmailVerification($user));
        }
    }

}
