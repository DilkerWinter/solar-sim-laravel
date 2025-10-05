<?php

use App\DataTables\ProductDataTable;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\KitController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
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
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');

/**
 * Routes with Auth
 */
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    //All routes for Product
    Route::get('/products/count', [ProductController::class, 'count'])->name('products.count');
    Route::resource('products', ProductController::class);

    //All routes for Product Types
    Route::get('/product-types/datatable', [ProductTypeController::class, 'dataTable'])->name('product-types.dataTable');
    Route::get('/products-types-count', [ProductTypeController::class, 'count'])->name('products.types.count');
    Route::resource('product-types', ProductTypeController::class);

    //All routes for Kit
    Route::get('/kits/count', [KitController::class, 'count'])->name('kits.count');
    Route::resource('kits', KitController::class);
    
    //All routes for Costumer
    Route::get('/customers/count', [CustomerController::class, 'count'])->name('customers.count');
    Route::get('/customers/dashboard', [CustomerController::class, 'getDashboardCustomers'])->name('customers.getDashboardCustomers');
    Route::resource('customers', CustomerController::class);

    //All routes for Address
    Route::get('/address/count', [AddressController::class, 'count'])->name('address.count');

    //All routes for Proposal
    Route::get('/proposals/count/{status}', [ProposalController::class, 'countByStatus'])->name('proposals.countByStatus');
    Route::post('/proposals/pending', [ProposalController::class, 'pendingProposal'])->name('proposals.pending');
    Route::post('/proposals/approve', [ProposalController::class, 'approveProposal'])->name('proposals.approve');
    Route::post('/proposals/reject', [ProposalController::class, 'rejectProposal'])->name('proposals.reject');
    Route::get('/proposals/generate-pdf', [ProposalController::class, 'generatePdf'])->name('proposals.generatePdf');
    Route::resource('proposals', ProposalController::class);
});

/**
 * Routes with Admin
 */
Route::middleware(['auth', IsAdmin::class])->group(function () {
    
    //All routes for Employees
    Route::get('/employees/data-table', [EmployeeController::class, 'getDataTable'])->name('employees.dataTable');
    Route::post('/employees/reset-password', [EmployeeController::class, 'resetPassword'])->name('employees.resetPassword');
    Route::resource('employees', EmployeeController::class);

    //Admin panel
    Route::get('/adminpanel', function () {
        return Inertia::render('AdminPanel/Index');
    });


});

require __DIR__.'/auth.php';

