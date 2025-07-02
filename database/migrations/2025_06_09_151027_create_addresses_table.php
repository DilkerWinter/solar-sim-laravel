<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();

            $table->foreignId('customer_id')->constrained()->onDelete('cascade');

            $table->string('neighborhood')->nullable();
            $table->string('street')->nullable();
            $table->string('number')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('cep')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}
