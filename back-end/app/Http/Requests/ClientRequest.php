<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
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
        $id = $this->route()->user;
        $emailRule = 'required|email|unique:users,email';
        if ($id) {
            $emailRule .= ",{$id}";
            $name = $this->name;
            $email = $this->email;
            $password = $this->password;
            $role = $this->role;
            $rules = [];
            if ($name) {
                $rules['name'] = 'required|min:3';
            }
            if ($email) {
                $rules['email'] = $emailRule;
            }
            if ($password) {
                $rules['password'] = 'required|min:6';
            }
            if ($role) {
                $rules['role'] = 'required|in:admin,student,instructor';
            }
            return $rules;
        }
        return [
            'name' => 'required|min:3',
            'email' => $emailRule,
            'password' => 'required|min:6',
            'role' => 'required|in:admin,student,instructor',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif',
        ];

    }

    public function messages(): array
    {
        return [
            'required' => ':attribute bắt buộc phải nhập',
            'min' => ':attribute phải từ :min ký tự',
            'email' => ':attribute đúng định dạng email',
        ];
    }
    public function attributes(): array
    {
        return [
            'name' => 'Tên',
            'email' => 'Email',
            'password' => 'Mật khẩu',
            'role' => 'Vai trò',
            'image'=> 'Ảnh'
        ];
    }
}
