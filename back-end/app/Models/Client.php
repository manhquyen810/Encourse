<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'image',
    ];
    protected $hidden = ['password'];

    public function courses(){
        return $this->hasMany(Course::class,'client_id');
    }

    public function blogs(){
        return $this->hasMany(Blog::class,'client_id');
    }
    public function getImageAttribute($value)
    {
        return $value ? asset('storage/' . $value) : asset('images/default-user.png'); 
    }

}
