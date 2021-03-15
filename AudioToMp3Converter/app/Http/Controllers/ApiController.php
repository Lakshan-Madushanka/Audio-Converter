<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\User;
use App\Traits\ApiResponser;
use App\Traits\CloudConverter;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Access\Gate;
use Illuminate\Http\Request;

class ApiController extends Controller
{

    use ApiResponser, CloudConverter;

    /* public function __construct()
     {
         $this->middleware('auth:api');
     }

     protected function allowedAdminAction() {

         if(Gate::denies('admin-action')) {
             throw  new AuthorizationException('This action is unauthorized');
         }
     }*/

    // validate User request
    protected function validateUserRequest(Request $request, \App\Models\User $user = null)
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users' . $user ?? $user->email],
            'password' => [
                'required', 'string',
                'dumbpwd',
                'min:8',
                'regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/',
                'confirmed']

        ];

        $messages = [
            'password.regex' => [
                'Password should contain 3 of the following' =>
                    [
                        'English uppercase characters (A – Z)',
                        'Base 10 digits (0 – 9)',
                        'Non-alphanumeric (For example: !, $, #, or %)',
                        'Unicode characters !'
                    ]
            ]

        ];

        $this->validate($request, $rules, $messages);
    }

    protected function validateMusicRequest(Request $request, \App\Models\User $user = null)
    {
          $rules = [
              'input_file' => [
                  'required', 'max:20480',
                  'mimes:aac,ac3,m4a,wma,oga,voc,mp3'
                              ], //The value is in kilobytes. I.e. max:10240 = max 10 MB.
              'output_format' => ['in:mp3']
          ];

          $messages = [

          ];

          $this->validate($request, $rules, $messages);


    }
    protected function uploadAudio(User $user, Request $request)
    {

        $file = $this->checkFileExists($request);

        if($file) {
            $audioName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $inputAudio = $file->storeAs($user->id . '/', $audioName, 'uploads');
            $responseArray =  [
                'uploadSuccess' => $inputAudio,
                'name' => $audioName,
                'ext' => $extension,
            ];
            return $responseArray;

        }
    }

    protected function checkFileExists(Request $request) {

        if ($request->has('input_file')) {
            $audio = $request->file('input_file');
            return $audio;
        }

    }

    protected function checkInputFileExists(User $user, Request $request) {

        $file = $this->checkFileExists($request);
        if($file) {
            $audioName = $file->getClientOriginalName();
            $path = public_path('audio/inputs/' . $user->id . '/' . $audioName);

            if (file_exists($path)) {
                return true;
            }
        }

    }

    protected function checkOutputFileNameExists(User $user, Request $request) {

        if($request->has('output_file')) {
            $path = public_path('audio/outputs/' . $user->id . '/' . $request->output_file);

            if (file_exists($path)) {
                return true;
            }
        }

    }
}
