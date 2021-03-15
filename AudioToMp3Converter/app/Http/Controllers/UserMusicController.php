<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\User;
use App\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserMusicController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
       // $this->middleware('auth:api');
        //$this->middleware('verify');
        //$this->middleware('can:verifyUser,user');

    }

    public function index()
    {
        //
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(User $user, Request $request)
    {
        $this->validateMusicRequest($request, $user);
        $checkInput = $this->checkInputFileExists($user, $request);
        if($checkInput) {
            return $this->errorResponse('File already exists', 404);
        }
        $responseArray = $this->uploadAudio($user, $request);
        if(!$responseArray['uploadSuccess']) {
            return $this->errorResponse('Error occured while uploading please try again', 500);
        }

          DB::transaction(function () use ($responseArray, $user) {

            $music = Music::create([
                'input_file' => $responseArray['name'],
                'input_format'=> $responseArray['ext'],
                'user_id' => $user->id

            ]);
            //return $this->showOne($music, 'Music uploaded successfully', 201);

        });

        return $responseArray;

    }

    public function convert(User $user, Request $request) {

        $this->validate($request, ['output_file' => ['required', 'max:250']]);
        $fileExists = $this->checkOutputFileNameExists($user, $request);
        if($fileExists) {
            return $this->errorResponse( 'File name has already been taken',  422);
        }
        $inputFile = $user->music()->where('convert_status', '=', 'start')
            ->orderByDesc('id')->get()->first();

        if(!$inputFile) {
            return $this->errorResponse( 'Please upload a file to convert',  422);
        }

        // set convert status to pending
        $inputFile->convert_status = 'pending';
        //$inputFile->output_file = $request->output_file;
        $inputFile->save();

        //convert music
        $status = $this->convertAudio($user, $inputFile, $request->output_file.'.mp3', $outputFormat = 'mp3');

        if($status == 'success') {
            return $this->showMessage( ['success' => 'Audio converted successfully'],  200);
        }elseif ($status == 'success') {
            return $this->errorResponse( 'error occured, please try again',  500);
        }
    }

    public function download(User $user) {

        $file = $user->music()->where([['convert_status', '=', 'success'], ['downloaded', '=', false]])
            ->orderByDesc('id')->get()->first();

        if($file) {
            $outputPath = public_path('audio/outputs/'. $user->id .'/' .$file->output_file);

            if(file_exists($outputPath)) {
                $file->downloaded = true;
                $file->save();
                 return response()->download($outputPath);//->deleteFileAfterSend(true);

            }
            return $this->errorResponse('Noting to download', 404);

        }else {
            return $this->errorResponse('Noting to download', 404);
        }
    }

    public function history(User $user) {

        return $this->showAll($user->music,'success', 200);

    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
