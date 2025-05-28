<?php

namespace Tests\Unit;

use App\Models\Label;
use App\Models\Priority;
use App\Models\Project;
use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Phpunit\TestCase;

class RelatioshipsTest extends TestCase
{
    use RefreshDatabase;

    public function test_status_relatioships()
    {
        $status = Status::findOrFail(1);

        $this->assertInstanceOf(Task::class, $status->tasks[0]);
    }

    public function test_label_relatioships()
    {
        $label = Label::findOrFail(1);

        $this->assertInstanceOf(Task::class, $label->tasks[0]);
    }

    public function test_priority_relatioships()
    {
        $priority = Priority::findOrFail(1);

        $this->assertInstanceOf(Task::class, $priority->tasks[0]);
    }

    public function test_user_relatioships()
    {
        $user = User::findOrFail(1);

        $this->assertInstanceOf(Project::class, $user->projects[0]);
    }

    public function test_project_relatioships()
    {
        $project = Project::findOrFail(1);

        $this->assertInstanceOf(Task::class, $project->tasks[0]);
        $this->assertInstanceOf(User::class, $project->users[0]);
    }

    public function test_task_relatioships()
    {
        $task = Task::findOrFail(1);

        $this->assertInstanceOf(Project::class, $task->project);
        $this->assertInstanceOf(Label::class, $task->label);
        $this->assertInstanceOf(Status::class, $task->status);
        $this->assertInstanceOf(Priority::class, $task->priority);
    }
}
