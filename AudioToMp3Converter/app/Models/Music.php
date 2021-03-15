<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    use HasFactory;

    protected $fillable = [
        'input_file', 'output_file', 'input_format', 'output_format',
        'downloaded', 'convert_status', 'user_id'
    ];

    public function User() {
        return $this->belongsTo(Music::class,);
    }
}
