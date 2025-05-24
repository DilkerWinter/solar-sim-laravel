<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_products()
    {
        $product = $this->createTestProduct();

        $response = $this->get(route('products.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Products/Index')
                 ->has('products')
        );
    }

    public function test_create_displays_create_form()
    {
        $response = $this->get(route('products.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Products/Create')
        );
    }

    public function test_store_validates_and_creates_product()
    {
        $data = [
            'name' => 'Test Product',
            'description' => 'Product description',
            'price' => 99.99,
            'brand' => 'Brand X',
            'category' => 'Category Y',
            'data' => json_encode(['info' => 'extra']),
        ];

        $response = $this->post(route('products.store'), $data);

        $response->assertRedirect(route('products.index'));
        $this->assertDatabaseHas('products', ['name' => 'Test Product']);
    }

    public function test_show_displays_product()
    {
        $product = $this->createTestProduct();

        $response = $this->get(route('products.show', $product));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Products/Show')
                 ->where('product.id', $product->id)
        );
    }

    public function test_edit_displays_edit_form()
    {
        $product = $this->createTestProduct();

        $response = $this->get(route('products.edit', $product));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Products/Edit')
                 ->where('product.id', $product->id)
        );
    }

    public function test_update_validates_and_updates_product()
    {
        $product = $this->createTestProduct();

        $data = [
            'name' => 'Updated Product',
            'description' => 'Updated description',
            'price' => 150.00,
            'brand' => 'Updated Brand',
            'category' => 'Updated Category',
            'data' => null,
        ];

        $response = $this->put(route('products.update', $product), $data);

        $response->assertRedirect(route('products.index'));
        $this->assertDatabaseHas('products', ['id' => $product->id, 'name' => 'Updated Product']);
    }

    public function test_destroy_deletes_product()
    {
        $product = $this->createTestProduct();

        $response = $this->delete(route('products.destroy', $product));

        $response->assertRedirect(route('products.index'));
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    private function createTestProduct(): Product
    {
        return Product::create([
            'name' => 'Test Product',
            'description' => 'Sample description',
            'price' => 10.00,
            'brand' => 'Brand A',
            'category' => 'Category B',
            'data' => json_encode(['sample' => 'data']),
        ]);
    }
}
