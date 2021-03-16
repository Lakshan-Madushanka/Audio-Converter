<?php
namespace App\Traits;


use App\Models\Music;
use App\Notifications\AudioConverted;
use CloudConvert\CloudConvert;
use CloudConvert\Models\Job;
use CloudConvert\Models\Task;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait CloudConverter
{

    protected function createMusicConvertObject()
    {
        return new CloudConvert(['api_key' => env('CLOUDCONVERT_API_KEY')]);

    }

    protected function createJob($outputFormat)
    {
        $job = (new Job())
            ->addTask(new Task('import/upload', 'upload-my-file'))
            ->addTask(
                (new Task('convert', 'convert-my-file'))
                    ->set('input', 'upload-my-file')
                    ->set('output_format', $outputFormat)
            )
            ->addTask(
                (new Task('export/url', 'export-my-file'))
                    ->set('input', 'convert-my-file')
            );

        return $job;
    }

    public function convertAudio($user, Music $inputFile, $outputFile, $outputFormat)
    {
        $musicConverter = $this->createMusicConvertObject();
        $job = $this->createJob($outputFormat);

        $outputDirectory =  public_path('audio/outputs/'. $user->id );
        $outputPath = $outputDirectory .'/'. $outputFile;
        $inputPath = public_path('audio/inputs/' . $user->id. '/'. $inputFile->input_file );
        $status = 'pending';
        //create directory if not exists
        if(!File::isDirectory($outputDirectory)){
            File::makeDirectory($outputDirectory, 0777, true, true);
        }
        $musicConverter->jobs()->create($job);
        $uploadTask = $job->getTasks()->whereName('upload-my-file')[0];

        $inputStream = fopen($inputPath, 'r+');
        $musicConverter->tasks()->upload($uploadTask, $inputStream);
        $musicConverter->jobs()->wait($job); // Wait for job completion

        foreach ($job->getExportUrls() as $file) {

            $source = $musicConverter->getHttpTransport()->download($file->url)->detach();
            $dest = fopen($outputPath, 'w+');

            stream_copy_to_stream($source, $dest);
        }

       if(file_exists($outputPath)) {

          $user->music()->where('convert_status', '=', 'pending')
               ->update([
                   'convert_status' => 'success',
                   'output_file' => $outputFile,
                   'output_format' => $outputFormat
               ]);
           // Converte success massage send to user
           $user->notify(new AudioConverted($inputFile->input_file));
           // Delete Converted input file if converted
           File::delete($inputPath);
           $status = 'success';
       }else{

           $user->music()->where('convert_status', '=', 'pending')
               ->update(['convert_status' => 'error']);

           $status = 'error';

       }
            return $status;
    }
}
