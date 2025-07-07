<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'integer', 'between:0,4294967295'],
            'description' => ['nullable', 'string', 'max:5000'],
            'label_id' => ['nullable', 'exists:labels,id'],
            'status_id' => ['nullable', 'exists:statuses,id'],
            'priority_id' => ['nullable', 'exists:priorities,id'],
        ];
    }
}
