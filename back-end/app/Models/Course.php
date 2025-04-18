<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'image', 'price', 'client_id', 'subject_id'
    ];

    protected $hidden = ['client_id', 'subject_id'];

    public function author()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function getImageAttribute($value)
    {
        return $value ? asset('storage/' . $value) : asset('images/default-course.png');
    }
}