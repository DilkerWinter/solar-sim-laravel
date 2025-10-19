<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MoveRoofTypeFromAddressEnergyInfosToAddresses extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('address_energy_infos', function (Blueprint $table) {
            $table->dropColumn('roof_type');
        });

        Schema::table('addresses', function (Blueprint $table) {
            $table->string('roof_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('addresses', function (Blueprint $table) {
            $table->dropColumn('roof_type');
        });

        Schema::table('address_energy_infos', function (Blueprint $table) {
            $table->string('roof_type')->nullable();
        });
    }
}
