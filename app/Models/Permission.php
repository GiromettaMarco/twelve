<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tag',
        'label',
        'description',
    ];

    /**
     * Many To Many Relationship.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
