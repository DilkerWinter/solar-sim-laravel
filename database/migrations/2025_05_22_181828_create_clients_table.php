<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();

            // Personal Information
            $table->string('name');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            // Address
            $table->string('street')->nullable();
            $table->string('number')->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();

            // Energy Information
            $table->float('average_monthly_consumption_kwh')->nullable();
            $table->float('average_annual_consumption_kwh')->nullable();
            $table->decimal('average_energy_bill', 10, 2)->nullable();
            $table->string('energy_provider')->nullable();
            $table->enum('installation_type', ['residential', 'industrial', 'commercial'])->nullable();
            $table->string('roof_type')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
