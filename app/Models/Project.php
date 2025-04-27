<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

// use Illuminate\Database\Eloquent\Casts\Attribute;
// use Illuminate\Support\Carbon;

class Project extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'archived',
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'archived' => false,
    ];

    /**
     * Accessor for 'created_at' field.
     */
    //    protected function createdAt(): Attribute
    //    {
    //        return Attribute::make(
    //            get: fn (string $value) => Carbon::parse($value)->format('d M Y'),
    //        );
    //    }

    /**
     * One To Many Relationship
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Many To Many Relationship.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * The "booted" method of the model.
     */
    // protected static function booted(): void
    // {
    //     static::creating(static function (Project $project): void {
    //         // If no team is specified, attach the project to the current user's team
    //         if ( ! isset($project->team_id)) {
    //             $project->team()->associate(request()->user()->currentTeam);
    //         }
    //     });

    //     static::created(static function (Project $project): void {
    //         // Reposition other projects if the new one is created on top
    //         if ($project->position === 0) {
    //             $project->shift();
    //         }
    //     });

    //     static::updating(static function (Project $project): void {
    //         // Reorder projects if position is updated
    //         $project->reorderOnPositionUpdate();

    //         // Reorder projects if archived is updated
    //         if ($project->isDirty('archived')) {
    //             $new_archived = $project->archived;
    //             $where_clauses = $project->getSiblingClauses();

    //             if ($new_archived) {
    //                 array_push($where_clauses,
    //                     ['position', '>', $project->position]
    //                 );

    //                 $project->shift($where_clauses, false);
    //             } else {
    //                 array_push($where_clauses,
    //                     ['position', '>=', $project->position]
    //                 );

    //                 $project->shift($where_clauses, true);
    //             }
    //         }
    //     });

    //     static::deleted(static function (Project $project): void {
    //         // Reposition other projects
    //         $project->shift([
    //             ['team_id', '=', $project->team_id],
    //             ['position', '>', $project->position]
    //         ], increase: false);
    //     });
    // }
}
