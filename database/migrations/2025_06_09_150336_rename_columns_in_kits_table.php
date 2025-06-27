<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('kits', function (Blueprint $table) {
            $table->renameColumn('totalPrice', 'total_price');
            $table->renameColumn('maxPotencyKw', 'max_potency_kw');
        });
    }

    public function down()
    {
        Schema::table('kits', function (Blueprint $table) {
            $table->renameColumn('total_price', 'totalPrice');
            $table->renameColumn('max_potency_kw', 'maxPotencyKw');
        });
    }

};
