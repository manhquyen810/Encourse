<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogRequest extends FormRequest
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
            'title' => 'required|min:3',
            'content' => 'required|min:10',
            'client_id' => 'required|integer|exists:clients,id',
        ];
    }
    public function messages(): array
    {
        return [
            'required' => ':attribute bắt buộc phải nhập',
            'min' => ':attribute phải từ :min ký tự',
            'exists' => ':attribute không tồn tại trong hệ thống',
        ];
    }
    public function attributes(): array
    {
        return [
            'title' => 'Tên tiêu đề',
            'content' => 'Nội dung',
            'client_id' => 'Khách hàng',
        ];
    }
}
