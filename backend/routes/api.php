<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DonationController;

Route::get('/test', function () {
    return response()->json(['message' => 'Hello from Laravel!']);
});

//this is the route to add a donation (which i added in backend>http/Controllers>DonationController.php)
Route::post('/donations', [DonationController::class, 'store']); //store is POST request(creates new record)
//this route gets donations 
Route::get('/donations', [DonationController::class, 'index']); //index is GET(gets donation)

