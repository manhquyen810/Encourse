<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::apiResource('admin', ClientController::class);

Route::apiResource('subjects', SubjectController::class);

Route::apiResource('courses', CourseController::class);

Route::apiResource('blogs', BlogController::class);
