<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\KitController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

Route::get('/login', function () {
    return Inertia::render('auth.login');
});





Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/**
 * Routes with Auth
 */
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //All routes for Product
    Route::resource('products', ProductController::class);
    
    //All routes for Kits
    Route::resource('kits', KitController::class);
    
    //All routes for Costumer
    Route::resource('customers', CustomerController::class);

});

/**
 * Routes with Admin
 */
Route::middleware(['auth', IsAdmin::class])->group(function () {

});

require __DIR__.'/auth.php';

