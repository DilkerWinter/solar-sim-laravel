<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kit_id')->nullable()->constrained('kits')->nullOnDelete();
            $table->foreignId('address_id')->constrained('addresses')->onDelete('cascade');
            $table->integer('final_price');
            $table->string('status');
            $table->text('observation')->nullable();
            $table->integer('estimated_annual_consumption_kwh')->nullable();
            $table->integer('estimated_monthly_bill')->nullable();
            $table->double('generated_kwh')->nullable();
            $table->double('supported_kw')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
