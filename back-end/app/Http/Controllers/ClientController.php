<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use App\Http\Requests\ClientRequest;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::latest();
        $q = request()->query('find');
        if($q){
            $clients = $clients->where(function($query) use ($q){
                $query->where('name', 'like', '%'.$q.'%');
                $query->orWhere('email', 'like', '%'.$q.'%');
            });
        }

        return response()->json([
            'success' => true,
            'data' => $clients->paginate(10),
            'message' => 'Clients fetched successfully '
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
public function store(ClientRequest $request)
{
    $client = new Client();
    $client->fill($request->except('image'));

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('clients', 'public');
        $client->image = $imagePath;
    }

    $client->password = bcrypt($request->password);
    $client->save();

    return response()->json([
        'success' => true,
        'data' => $client,
        'message' => 'Client created successfully'
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return response()->json([
            'success' => true,
            'data' => $client,
            'message' => 'Client fetched successfully '
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */

    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ClientRequest $request, string $id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Client not found'
                ],
                404
            );
        }

        if ($request->name) {
            $client->name = $request->name;
        }
        if ($request->email) {
            $client->email = $request->email;
        }
        if ($request->password) {
            $client->password = bcrypt($request->password);
        }
        if($request->role){
            $client->role = $request->role;
        }

        $client->save();

        return response()->json(
            [
                'success' => true,
                'data' => $client,
                'message' => 'Client updated successfully'
            ]
        );

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Client not found'
                ],
                404
            );
        }
        $client->delete();
        return response()->json(
            [
                'success' => true,
                'message' => 'Client deleted successfully'
            ]
        );
    }
}
