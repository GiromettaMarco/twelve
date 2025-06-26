<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'position',
        'description',
    ];

    /**
     * One To Many (Inverse) / Belongs To Relationship
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * One To Many (Inverse) / Belongs To Relationship
     */
    public function label(): BelongsTo
    {
        return $this->belongsTo(Label::class);
    }

    /**
     * One To Many (Inverse) / Belongs To Relationship
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    /**
     * One To Many (Inverse) / Belongs To Relationship
     */
    public function priority(): BelongsTo
    {
        return $this->belongsTo(Priority::class);
    }
}
