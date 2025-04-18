<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectRequest;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = Subject::latest();
        $q = request()->query('find');
        if ($q){
            $subjects = $subjects->where(function ($query) use ($q){
                $query->where('name', 'like', '%'.$q.'%');
            });
        }
        return response()->json([
            'success' => true,
            'data' => $subjects->paginate(10),
            'message'=> 'subjects fetched successfully'
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
    public function store(SubjectRequest $request)
    {
        $subject = new Subject();
        $subject->fill($request->all());
        $subject->save();
        return response()->json([
            'success' => true,
            'subject' => $subject,
            'message'=> 'Subject created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json([
                'success' => false,
                'message' => 'Subject not found'
            ],404);
        }
        return response()->json([
            'success' => true,
            'subject' => $subject,
            'message'=> 'Subject fetched successfully'
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubjectRequest $request, string $id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json([
                'success' => false,
                'message' => 'Subject not found'
            ],404);
        }
        if($request->name){
            $subject->name = $request->name;
        }
        $subject->save();
        return response()->json([
            'success' => true,
            'subject' => $subject,
            'message'=> 'Subject updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json([
                'success' => false,
                'message' => 'Subject not found'
            ],404);
        }
        $subject->delete();
        return response()->json([
            'success' => true,
            'message' => 'Subject deleted successfully'
        ]);
    }
}
