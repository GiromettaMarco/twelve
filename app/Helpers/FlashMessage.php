<?php

namespace App\Helpers;

class FlashMessage
{
    public $title;

    public $level;

    public $description;

    public function __construct(string $title, ?string $level = null, ?string $description = null)
    {
        $this->title = $title;
        $this->level = $level;
        $this->description = $description;
    }

    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'level' => $this->level,
            'description' => $this->description,
        ];
    }
}
