<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveInstallationTypeFromAddressEnergyInfos extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('address_energy_infos', function (Blueprint $table) {
            $table->dropColumn('installation_type');
        });

        Schema::table('addresses', function (Blueprint $table) {
            $table->enum('type', ['residencial', 'comercial', 'industrial', 'rural'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('addresses', function (Blueprint $table) {
            $table->dropColumn('type');
        });

        Schema::table('address_energy_infos', function (Blueprint $table) {
            $table->enum('installation_type', ['residencial', 'comercial', 'industrial', 'rural'])->nullable();
        });
    }
}
