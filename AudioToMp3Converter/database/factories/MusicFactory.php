<?php

namespace Database\Factories;

use App\Models\Music;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class MusicFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Music::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user_id = User::all()->random(1)->first()->id;
        return [
            'input_name' => $this->faker->randomElement(['music1.wma', 'music2.wma']),
            'output_name' => $this->faker->randomElement(['music1.mp3', 'music2.mp3']),
            'output_format' => 'mp3',
            'input_format' => 'wmv',
            'user_id' => $user_id

        ];
    }
}
