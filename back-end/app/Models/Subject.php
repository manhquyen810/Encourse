<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Subject extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];

    public function courses(){
        return $this->hasMany(Course::class, 'subject_id');
    }
}
