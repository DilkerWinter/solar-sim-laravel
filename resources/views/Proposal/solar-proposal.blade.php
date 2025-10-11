<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proposta de Energia Solar</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body { 
            background-color: #f5f5f5;
            padding: 20px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        /* Header */
        .header {
            background-color: #22c55e;
            color: white;
            padding: 30px 20px;
            text-align: center;
        }

        .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .header-subtitle {
            font-size: 18px;
            margin-bottom: 15px;
            opacity: 0.95;
        }

        .status-badge {
            display: inline-block;
            background-color: #fef3c7;
            color: #92400e;
            padding: 8px 16px;
            border-radius: 5px;
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
        }

        /* Section */
        .section {
            padding: 25px 20px;
            border-bottom: 3px solid #e5e7eb;
        }

        .section-title {
            font-size: 22px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #22c55e;
        }

        /* Grid */
        .grid {
            display: table;
            width: 100%;
            margin-bottom: 15px;
        }

        .grid-row {
            display: table-row;
        }

        .grid-cell {
            display: table-cell;
            padding: 10px 15px 10px 0;
            vertical-align: top;
            width: 50%;
        }

        .grid-cell-33 {
            display: table-cell;
            padding: 10px 15px 10px 0;
            vertical-align: top;
            width: 33.33%;
        }

        .grid-cell-25 {
            display: table-cell;
            padding: 10px 15px 10px 0;
            vertical-align: top;
            width: 25%;
        }

        .field-label {
            font-size: 12px;
            color: #6b7280;
            font-weight: bold;
            margin-bottom: 5px;
            text-transform: uppercase;
        }

        .field-value {
            font-size: 16px;
            color: #111827;
            font-weight: 600;
        }

        /* Address Box */
        .address-box {
            margin-top: 20px;
            padding: 15px;
            background-color: #f9fafb;
            border-radius: 5px;
            border: 2px solid #e5e7eb;
        }

        .address-box p {
            margin-bottom: 8px;
        }

        /* Info Cards */
        .info-cards {
            display: table;
            width: 100%;
            margin-bottom: 15px;
        }

        .info-card {
            display: table-cell;
            padding: 15px;
            border: 2px solid #3b82f6;
            background-color: white;
            text-align: center;
            width: 33.33%;
        }

        .info-card + .info-card {
            border-left: none;
        }

        .info-card-label {
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #6b7280;
            text-transform: uppercase;
        }

        .info-card-value {
            font-size: 20px;
            font-weight: bold;
            color: #3b82f6;
        }

        .info-card-green {
            border-color: #22c55e;
        }

        .info-card-green .info-card-value {
            color: #22c55e;
        }

        /* Kit Box */
        .kit-box {
            background-color: #f0fdf4;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
            border: 2px solid #22c55e;
        }

        .kit-box h3 {
            font-size: 20px;
            color: #166534;
            margin-bottom: 10px;
        }

        .kit-box p {
            margin-bottom: 15px;
        }

        .stat-cards {
            display: table;
            width: 100%;
        }

        .stat-card {
            display: table-cell;
            background-color: white;
            padding: 15px;
            border: 2px solid #e5e7eb;
            text-align: center;
            width: 33.33%;
        }

        .stat-card + .stat-card {
            border-left: none;
        }

        .stat-card-label {
            font-size: 11px;
            color: #6b7280;
            margin-bottom: 8px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .stat-card-value {
            font-size: 22px;
            font-weight: bold;
        }

        .stat-green { color: #16a34a; }
        .stat-blue { color: #2563eb; }
        .stat-yellow { color: #ca8a04; }

        /* Product Card */
        .product-card {
            border: 2px solid #e5e7eb;
            padding: 15px;
            margin-bottom: 15px;
            background-color: #ffffff;
            page-break-inside: avoid;
        }

        .product-header {
            margin-bottom: 12px;
        }

        .product-title-row {
            margin-bottom: 10px;
        }

        .quantity-badge {
            display: inline-block;
            background-color: #eab308;
            color: white;
            padding: 5px 12px;
            border-radius: 4px;
            font-size: 13px;
            font-weight: bold;
            margin-right: 10px;
        }

        .product-title {
            display: inline;
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
        }

        .type-badge {
            display: inline-block;
            background-color: #dbeafe;
            color: #1e40af;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            margin: 8px 0;
        }

        .product-description {
            color: #4b5563;
            font-size: 13px;
            margin: 8px 0;
        }

        .product-brand {
            font-size: 13px;
            color: #6b7280;
            margin: 5px 0;
        }

        .product-price-row {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px solid #e5e7eb;
        }

        .product-price-label {
            font-size: 12px;
            color: #6b7280;
            font-weight: bold;
        }

        .product-price-value {
            font-size: 20px;
            font-weight: bold;
            color: #16a34a;
        }

        /* Specs Table */
        .specs-table {
            margin-top: 12px;
            padding-top: 12px;
            border-top: 2px solid #e5e7eb;
            display: table;
            width: 100%;
        }

        .spec-row {
            display: table-row;
        }

        .spec-cell {
            display: table-cell;
            padding: 8px 10px 8px 0;
            width: 25%;
        }

        .spec-label {
            font-size: 11px;
            color: #6b7280;
            font-weight: bold;
            margin-bottom: 3px;
            text-transform: uppercase;
        }

        .spec-value {
            font-size: 14px;
            font-weight: bold;
            color: #111827;
        }

        /* Benefits */
        .benefits-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            page-break-inside: avoid;
        }

        .benefit-card {
            flex: 1 1 calc(50% - 10px);
            padding: 25px;
            border: 3px solid #d1d5db;
            background-color: #f9fafb;
            border-left-width: 6px;
            box-sizing: border-box;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .benefit-card h3 {
            font-size: 17px;
            margin-bottom: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .benefit-card p {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.7;
        }

        .benefit-green {
            border-left-color: #16a34a;
            background-color: #f0fdf4;
        }

        .benefit-green h3 {
            color: #15803d;
        }

        .benefit-blue {
            border-left-color: #2563eb;
            background-color: #eff6ff;
        }

        .benefit-blue h3 {
            color: #1e40af;
        }

        .benefit-yellow {
            border-left-color: #f59e0b;
            background-color: #fffbeb;
        }

        .benefit-yellow h3 {
            color: #d97706;
        }

        .keep-together {
            page-break-inside: avoid;
            break-inside: avoid;
            page-break-before: always;
        }

        @media print {
            .keep-together {
                page-break-inside: avoid;
                break-inside: avoid;
            }
        
            .keep-together .section,
            .keep-together .footer {
                page-break-inside: avoid;
                break-inside: avoid;
            }
        }

        /* Observation */
        .observation-box {
            background-color: #f9fafb;
            padding: 15px;
            border: 2px solid #9ca3af;
            margin-top: 15px;
        }

        .observation-title {
            font-size: 12px;
            font-weight: bold;
            color: #374151;
            margin-bottom: 8px;
            text-transform: uppercase;
        }

        .observation-text {
            color: #4b5563;
            font-size: 13px;
        }

        /* Footer */
        .footer {
            background-color: #22c55e;
            color: white;
            padding: 30px 20px;
            text-align: center;
        }

        .footer-label {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
        }

        .footer-price {
            font-size: 42px;
            font-weight: bold;
            margin: 15px 0;
        }

        .footer-date {
            font-size: 13px;
            opacity: 0.9;
        }

        @media print {
            body {
                padding: 0;
                background-color: white;
            }
            .container {
                box-shadow: none;
                max-width: 100%;
            }
            .section {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>Proposta de Energia Solar</h1>
            <p class="header-subtitle">Sistema Fotovoltaico Personalizado</p>
            <div class="status-badge">
                Status: {{ $proposal['status'] }}
            </div>
        </div>

        <!-- Dados do Cliente -->
        <div class="section">
            <h2 class="section-title">Dados do Cliente</h2>
            
            <div class="grid">
                <div class="grid-row">
                    <div class="grid-cell">
                        <p class="field-label">Nome</p>
                        <p class="field-value">{{ $proposal['customer']['name'] }}</p>
                    </div>
                    @if(!empty($proposal['customer']['document_number']))
                    <div class="grid-cell">
                        <p class="field-label">CPF/CNPJ</p>
                        <p class="field-value">{{ $proposal['customer']['document_number'] }}</p>
                    </div>
                    @endif
                </div>
                @if(!empty($proposal['customer']['email']) || !empty($proposal['customer']['phone']))
                <div class="grid-row">
                    @if(!empty($proposal['customer']['email']))
                    <div class="grid-cell">
                        <p class="field-label">E-mail</p>
                        <p class="field-value">{{ $proposal['customer']['email'] }}</p>
                    </div>
                    @endif
                    @if(!empty($proposal['customer']['phone']))
                    <div class="grid-cell">
                        <p class="field-label">Telefone</p>
                        <p class="field-value">{{ $proposal['customer']['phone'] }}</p>
                    </div>
                    @endif
                </div>
                @endif
            </div>

            @if(!empty($proposal['address']))
            <div class="address-box">
                <p class="field-label">Endereço da Instalação</p>
                <p class="field-value">
                    {{ $proposal['address']['street'] }}, {{ $proposal['address']['number'] }} - {{ $proposal['address']['neighborhood'] }}
                </p>
                <p class="field-value">
                    {{ $proposal['address']['city'] }}/{{ $proposal['address']['state'] }} - CEP: {{ $proposal['address']['cep'] }}
                </p>
                @if(!empty($proposal['address']['type']))
                <p style="margin-top: 8px;"><strong>Tipo:</strong> {{ $proposal['address']['type'] }}</p>
                @endif
                @if(!empty($proposal['address']['roof_type']))
                <p><strong>Tipo de Telhado:</strong> {{ $proposal['address']['roof_type'] }}</p>
                @endif
            </div>
            @endif
        </div>

        <!-- Dados de Energia -->
        @php
            $energyInfo = $proposal['address']->energyInfo ?? $proposal['address']->energy_info ?? null;
        @endphp
        @if(!empty($energyInfo))
        <div class="section">
            <h2 class="section-title">Dados de Energia</h2>

            <div class="info-cards">
                @if(!empty($energyInfo['average_annual_consumption_kwh']) || !empty($energyInfo->average_annual_consumption_kwh))
                <div class="info-card">
                    <p class="info-card-label">Consumo Médio Anual</p>
                    <p class="info-card-value">{{ $energyInfo['average_annual_consumption_kwh_formatted'] ?? $energyInfo->average_annual_consumption_kwh_formatted }} kWh</p>
                </div>
                @endif
                @if(!empty($energyInfo['average_energy_bill']) || !empty($energyInfo->average_energy_bill))
                <div class="info-card info-card-green">
                    <p class="info-card-label">Conta Média Mensal</p>
                    <p class="info-card-value">R$ {{ $energyInfo['average_energy_bill_formatted'] ?? $energyInfo->average_energy_bill_formatted }}</p>
                </div>
                @endif
                @if(!empty($energyInfo['energy_provider']) || !empty($energyInfo->energy_provider))
                <div class="info-card">
                    <p class="info-card-label">Concessionária</p>
                    <p class="info-card-value" style="font-size: 16px;">{{ $energyInfo['energy_provider'] ?? $energyInfo->energy_provider }}</p>
                </div>
                @endif
            </div>

            @if(!empty($energyInfo['notes']) || !empty($energyInfo->notes))
            <div class="observation-box">
                <p class="observation-title">Observações sobre o Consumo</p>
                <p class="observation-text">{{ $energyInfo['notes'] ?? $energyInfo->notes }}</p>
            </div>
            @endif
        </div>
        @endif

        <!-- Kit e Produtos -->
        @php
            $kit = $proposal['kit'] ?? $proposal->kit ?? null;
        @endphp
        @if(!empty($kit))
        <div class="section">
            <h2 class="section-title">Sistema Proposto</h2>

            <div class="kit-box">
                <h3>{{ $kit['name'] ?? $kit->name }}</h3>
                @php
                    $kitDescription = $kit['description'] ?? $kit->description ?? null;
                @endphp
                @if(!empty($kitDescription))
                <p>{{ $kitDescription }}</p>
                @endif
                
                <div class="stat-cards">
                    @php
                        $generatedKwh = $kit['generated_kwh'] ?? $kit->generated_kwh ?? null;
                        $monthlyGeneration = $generatedKwh * 30;
                        $monthlyGenerationFormatted = number_format($monthlyGeneration, 2, ',', '.');
                    @endphp
                    @if(!empty($generatedKwh))
                    <div class="stat-card">
                        <p class="stat-card-label">Geração Mensal</p>
                        <p class="stat-card-value stat-green">{{ $monthlyGenerationFormatted }} kW</p>
                    </div>
                    @endif
                    
                    @php
                        $supportedKw = $kit['supported_kw'] ?? $kit->supported_kw ?? null;
                        $supportedKwFormatted = number_format($supportedKw, 2, ',', '.');
                    @endphp
                    @if(!empty($supportedKw))
                    <div class="stat-card">
                        <p class="stat-card-label">Potência do Sistema</p>
                        <p class="stat-card-value stat-blue">{{ $supportedKwFormatted }} kW</p>
                    </div>
                    @endif
                    
                    @php
                        $totalPrice = $kit['total_price'] ?? $kit->total_price ?? null;
                        $totalPriceFormatted = $kit['total_price_formatted'] ?? $kit->total_price_formatted ?? null;
                    @endphp
                    @if(!empty($totalPrice))
                    <div class="stat-card">
                        <p class="stat-card-label">Investimento</p>
                        <p class="stat-card-value stat-yellow">R$ {{ $totalPriceFormatted }}</p>
                    </div>
                    @endif
                </div>
            </div>

            <!-- Produtos do Kit -->
            @php
                $kitProducts = $kit['kit_products'] ?? $kit->kitProducts ?? $kit->kit_products ?? null;
            @endphp
            @if(!empty($kitProducts))
            <h3 style="font-size: 20px; margin-bottom: 15px; color: #1f2937;">Componentes do Sistema</h3>
            
            @foreach($kitProducts as $kitProduct)
                @php
                    $product = $kitProduct['product'] ?? $kitProduct->product ?? null;
                    $quantity = $kitProduct['quantity'] ?? $kitProduct->quantity ?? 1;
                @endphp
                @if(!empty($product))
                <div class="product-card">
                    <div class="product-header">
                        <div class="product-title-row">
                            <span class="quantity-badge">{{ $quantity }}x</span>
                            <h4 class="product-title">{{ $product['name'] ?? $product->name }}</h4>
                        </div>
                        
                        @php
                            $productType = $product['type'] ?? $product->type ?? null;
                        @endphp
                        @if(!empty($productType))
                        <div>
                            <span class="type-badge">{{ $productType['name'] ?? $productType->name }}</span>
                        </div>
                        @endif
                        
                        @php
                            $productDescription = $product['description'] ?? $product->description ?? null;
                        @endphp
                        @if(!empty($productDescription))
                        <p class="product-description">{{ $productDescription }}</p>
                        @endif
                        
                        @php
                            $productBrand = $product['brand'] ?? $product->brand ?? null;
                        @endphp
                        @if(!empty($productBrand))
                        <p class="product-brand"><strong>Marca:</strong> {{ $productBrand }}</p>
                        @endif
                    </div>

                    @php
                        $productPrice = $product['price'] ?? $product->price ?? null;
                        $productPriceFormatted = $product['price_formatted'] ?? $product->price_formatted ?? null;
                    @endphp
                    @if(!empty($productPrice))
                    <div class="product-price-row">
                        <span class="product-price-label">Valor Unitário: </span>
                        <span class="product-price-value">R$ {{ $productPriceFormatted }}</span>
                    </div>
                    @endif

                    <!-- Especificações da Placa Solar -->
                    @php
                        $solarPanel = $product['solar_panel'] ?? $product->solarPanel ?? $product->solar_panel ?? null;
                    @endphp
                    @if(!empty($solarPanel))
                    <div class="specs-table">
                        <div class="spec-row">
                            @php
                                $potencyWatts = $solarPanel['potency_watts'] ?? $solarPanel->potency_watts ?? null;
                                $potencyWattsFormatted = $solarPanel['potency_watts_formatted'] ?? $solarPanel->potency_watts_formatted ?? null;
                            @endphp
                            @if(!empty($potencyWatts))
                            <div class="spec-cell">
                                <p class="spec-label">Potência</p>
                                <p class="spec-value">{{ $potencyWattsFormatted }}W</p>
                            </div>
                            @endif
                            
                            @php
                                $efficiency = $solarPanel['efficiency_percentage'] ?? $solarPanel->efficiency_percentage ?? null;
                                $efficiencyFormatted = $solarPanel['efficiency_percentage_formatted'] ?? $solarPanel->efficiency_percentage_formatted ?? null;
                            @endphp
                            @if(!empty($efficiency))
                            <div class="spec-cell">
                                <p class="spec-label">Eficiência</p>
                                <p class="spec-value">{{ $efficiencyFormatted }}%</p>
                            </div>
                            @endif
                            
                            @php
                                $monthlyEnergy = $solarPanel['average_monthly_energy_wh'] ?? $solarPanel->average_monthly_energy_wh ?? null;
                                $monthlyEnergyFormatted = $solarPanel['average_monthly_energy_wh_formatted'] ?? $solarPanel->average_monthly_energy_wh_formatted ?? null;
                            @endphp
                            @if(!empty($monthlyEnergy))
                            <div class="spec-cell">
                                <p class="spec-label">Geração Mensal</p>
                                <p class="spec-value">{{ $monthlyEnergyFormatted }}W</p>
                            </div>
                            @endif
                            
                            @php
                                $weight = $solarPanel['weight'] ?? $solarPanel->weight ?? null;
                                $weightFormatted = $solarPanel['weight_formatted'] ?? $solarPanel->weight_formatted ?? null;
                            @endphp
                            @if(!empty($weight))
                            <div class="spec-cell">
                                <p class="spec-label">Peso</p>
                                <p class="spec-value">{{ $weightFormatted }}kg</p>
                            </div>
                            @endif
                        </div>
                    </div>
                    @endif

                    <!-- Especificações do Inversor -->
                    @php
                        $inverter = $product['inverter'] ?? $product->inverter ?? null;
                    @endphp
                    @if(!empty($inverter))
                    <div class="specs-table">
                        <div class="spec-row">
                            @php
                                $inverterType = $inverter['type'] ?? $inverter->type ?? null;
                            @endphp
                            @if(!empty($inverterType))
                            <div class="spec-cell">
                                <p class="spec-label">Tipo</p>
                                <p class="spec-value">{{ $inverterType }}</p>
                            </div>
                            @endif
                            
                            @php
                                $maxPower = $inverter['max_power_watts'] ?? $inverter->max_power_watts ?? null;
                                $maxPowerFormatted = $inverter['max_power_watts_formatted'] ?? $inverter->max_power_watts_formatted ?? null;
                            @endphp
                            @if(!empty($maxPower))
                            <div class="spec-cell">
                                <p class="spec-label">Potência Máxima</p>
                                <p class="spec-value">{{ $maxPowerFormatted }}W</p>
                            </div>
                            @endif
                            
                            @php
                                $panelCount = $inverter['supported_panel_count'] ?? $inverter->supported_panel_count ?? null;
                            @endphp
                            @if(!empty($panelCount))
                            <div class="spec-cell">
                                <p class="spec-label">Suporta Placas</p>
                                <p class="spec-value">{{ $panelCount }}</p>
                            </div>
                            @endif
                        </div>
                    </div>
                    @endif
                </div>
                @endif
            @endforeach
            @endif
        </div>
        @endif
<div class="keep-together">
        <!-- Benefícios -->
<div class="section">
    <h2 class="section-title">Benefícios do Investimento</h2>

    <div class="benefits-grid">
        <div class="benefit-card benefit-green">
            <h3>Economia Sustentável</h3>
            <p>Reduza significativamente sua conta de energia e proteja-se contra aumentos nas tarifas.</p>
        </div>
        <div class="benefit-card benefit-blue">
            <h3>Valorização do Imóvel</h3>
            <p>Imóveis com energia solar têm valorização média de 6% no mercado imobiliário.</p>
        </div>
        <div class="benefit-card benefit-yellow">
            <h3>Energia Limpa</h3>
            <p>Contribua para um planeta mais sustentável com energia 100% renovável.</p>
        </div>
        <div class="benefit-card benefit-green">
            <h3>Retorno do Investimento</h3>
            <p>Sistema se paga em média entre 4 a 6 anos com economia na conta de luz.</p>
        </div>
    </div>

    @if(!empty($proposal['observation']))
    <div class="observation-box">
        <p class="observation-title">Observações</p>
        <p class="observation-text">{{ $proposal['observation'] }}</p>
    </div>
    @endif
</div>

        <!-- Footer -->
        <div class="footer">
            <p class="footer-label">Valor Total do Investimento</p>
            <p class="footer-price">R$ {{ number_format($proposal['final_price'] / 100, 2, ',', '.') }}</p>
            <p class="footer-date">Proposta gerada em {{ date('d/m/Y', strtotime($proposal['created_at'])) }}</p>
        </div>
        </div>
    </div>
</body>
</html>