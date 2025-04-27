<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// use Illuminate\Support\Carbon;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'text',
    ];

    /**
     * @var array
     */
    // protected $casts = [
    //     'deadline' => 'datetime',
    // ];

    /**
     * Accessor for 'deadline' field.
     */
    // protected function deadline(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn (string $value) => Carbon::parse($value)->format('d M Y'),
    //     );
    // }

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

    /**
     * The "booted" method of the model.
     */
    // protected static function booted(): void
    // {
    //     static::created(static function (Task $task): void {
    //         // Reposition other tasks if the new one is created on top
    //         if ($task->position === 0) {
    //             $task->shift();
    //         }
    //     });

    //     // Before updating a new project...
    //     static::updating(static function (Task $task): void {
    //         // Reorder tasks if position is updated
    //         $task->reorderOnPositionUpdate();
    //     });

    //     // Reposition tasks after deletion
    //     static::deleted(static function (Task $task): void {
    //         // Reposition other tasks
    //         $task->shift([
    //             ['project_id', '=', $task->project_id],
    //             ['position', '>', $task->position]
    //         ], increase: false);
    //     });
    // }
}
