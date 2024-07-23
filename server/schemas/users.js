const registerSchema = Joi.object({
    firstname: Joi.string().required().messages({
        "any.required":"Vui lòng nhập tên trước",
    }),
    lastname: Joi.string().required().messages({
        "any.required":"Vui lòng nhập tên sau",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Vui lòng nhập email",
        "string.email": "Email không hợp lệ",
    }),
    password: Joi.string().min(7).max(32).required().messages({
        "any.required": "Vui lòng nhập mật khẩu",
        "string.min": "Vui lòng nhập mật khẩu độ dài từ 7 tới 32 ký tự",
        "string.max": "Vui lòng nhập mật khẩu độ dài từ 7 tới 32 ký tự",
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "any.required": "Vui lòng nhập lại mật khẩu",
        "any.only": "Mật khẩu không trùng khớp",
    }),
    phone: Joi.string().trim().pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "Số điện thoại phải có đúng 10 chữ số",
        "any.required": "Vui lòng nhập số điện thoại",
        "string.trim":"Số điện thoại không được để khoảng trắng"
    })
});