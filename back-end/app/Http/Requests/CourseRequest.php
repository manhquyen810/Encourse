<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3',
            'description' => 'required|string|min:3',
            'price' => 'required|numeric|min:1',
            'client_id' => 'required|integer|exists:clients,id',
            'subject_id' => 'required|integer|exists:subjects,id',
        ];

    }

    public function messages(): array
    {
        return [
            'required' => ':attribute bắt buộc phải nhập',
            'min' => ':attribute phải từ :min ký tự',
            'numeric' => ':attribute phải là số'
        ];

    }
    public function attributes(): array
    {
        return [
            'name' => 'Tên khóa học',
            'price' => 'Giá',
            'Description' => 'Nội dung khóa học'
        ];
    }
}
