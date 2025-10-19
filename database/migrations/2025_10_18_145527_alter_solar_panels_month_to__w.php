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
        Schema::table('solar_panels', function (Blueprint $table) {
            $table->renameColumn('average_monthly_energy_wh', 'average_monthly_energy_w');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('solar_panels', function (Blueprint $table) {
            $table->renameColumn('average_monthly_energy_w', 'average_monthly_energy_wh');
        });
    }
};
