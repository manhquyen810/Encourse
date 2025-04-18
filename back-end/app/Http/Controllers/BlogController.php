<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogRequest;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::with('author')->latest();
        $q = request()->query('find');
        if ($q){
            $blogs = $blogs->where(function ($query) use ($q){
                $query->where('title','like','%'.$q.'%');
            });
        }
        return response()->json([
            'success' => true,
            'data' => $blogs->paginate(10),
            'message' => 'Blogs fetched successfully'
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
    public function store(BlogRequest $request)
    {
        $blog = Blog::create($request->validated());
        return response()->json([
            'success' => true,
            'data' => $blog,
            'message' => 'Blog created successfully'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        return response()->json([
            'success' => true,
            'blog' => $blog,
            'message' => 'Blog fetched successfully'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlogRequest $request,string $id)
    {
        $blog = Blog::find($id);
        if(!$blog){
            return response()->json([
                'success' => false,
                'message' => 'Blog not found'
            ]);
        }
        $blog->fill($request->all());
        $blog->save();
        return response()->json([
            'success' => true,
            'data' => $blog,
            'message' => 'Blog updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blog = Blog::find($id);
        if(!$blog){
            return response()->json([
                'success' => false,
                'message' => 'Blog not found'
            ]);
        }
        $blog->delete();
        return response()->json([
            'success' => true,
            'message' => 'Blog deleted successfully'
        ]);
    }
}
