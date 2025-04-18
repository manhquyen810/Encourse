<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Models\Client;
use App\Models\Course;
use App\Models\Subject;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $courses = Course::with('subject', 'author')->latest();

        $q = request()->query('find');
        if ($q){
            $courses = $courses->where(function ($query) use ($q){
                $query->where('name', 'like', '%'.$q.'%');
            });
        }
        return response()->json([
            'success' => true,
            'data' => $courses->paginate(10),
            'message' => 'Courses fetched successfully'
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CourseRequest $request)
    {
        $course = new Course();
        $course->fill($request->except('image'));

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('courses', 'public');
            $course->image = $imagePath;
        }
        $course->save();
        return response()->json([
            'success' => true,
            'data' => $course,
            'message' => 'Course created successfully'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $course = Course::with('subject', 'author')->find($id);
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ]);
        }
        return response()->json([
            'success' => true,
            'course' => $course,
            'message' => 'Course fetched successfully'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CourseRequest $request, string $id)
    {
        $course = Course::find($id);
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ]);
        }
        $course->fill($request->all());
        $course->save();
        return response()->json([
            'success' => true,
            'data' => $course,
            'message' => 'Course updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $course = Course::find($id);
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ]);
        }
        $course->delete();
        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully'
        ]);
    }
}
