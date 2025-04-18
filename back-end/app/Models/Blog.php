<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'content', 'client_id'
    ];

    protected $hidden = ['client_id'];

    public function author()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
}

