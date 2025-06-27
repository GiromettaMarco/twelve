<?php

namespace App\Helpers;

class FlashMessage
{
    /**
     * Flash message title.
     */
    public string $title;

    /**
     * Message log level.
     *
     * Supported levels: "info", "success", "warning" and "error".
     * If null, the default client side behavior is equivalent to "info".
     */
    public ?string $level;

    /**
     * Flash message description.
     */
    public ?string $description;

    public function __construct(string $title, ?string $level = null, ?string $description = null)
    {
        $this->title = $title;
        $this->level = $level;
        $this->description = $description;
    }

    /**
     * Convert the object data into an associative array.
     *
     * @codeCoverageIgnore
     */
    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'level' => $this->level,
            'description' => $this->description,
        ];
    }
}
