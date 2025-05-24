<?php

namespace Tests\Feature;
use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_product()
    {
        $product = Product::create([
            'name' => 'Test Product',
            'description' => 'Test Description',
            'price' => 100,
            'brand' => 'Test Brand',
            'category' => 'Test Category',
            'data' => json_encode(['key' => 'value']),
        ]);

        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'price' => 100,
        ]);

        $this->assertInstanceOf(Product::class, $product);
    }
}