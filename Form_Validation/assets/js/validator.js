// // Đối tượng `Validator`
// function Validator(options) {
//     function getParent(element, selector) {
//         while (element.parentElement) {
//             if (element.parentElement.matches(selector)) {
//                 return element.parentElement;
//             }
//             element = element.parentElement;
//         }
//     }

//     var selectorRules = [];

//     // Hàm thực hiện validate
//     function validate(inputElement, rule) {
//         var errorMessage;
//         var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

//         // Lấy ra các rules của selector
//         var rules = selectorRules[rule.selector];

//         // Lặp qua từng rule và kiểm tra
//         // Nếu có lỗi thì dừng việc kiểm tra 
//         for (var i = 0; i < rules.length; i++) {
//             switch (inputElement.type) {
//                 case 'radio':
//                 case 'checkbox':
//                     errorMessage = rules[i](
//                         formElement.querySelector(rule.selector + ':checked')
//                     );
//                     break;
//                 default:
//                     errorMessage = rules[i](inputElement.value);
//             }
//             if (errorMessage) break;
//         }

//         if (errorMessage) {
//             errorElement.innerHTML = errorMessage;
//             getParent(inputElement, options.formGroupSelector).classList.add('invalid');
//         } else {
//             errorElement.innerHTML = '';
//             getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
//         }

//         return !errorMessage;
//     }

//     // Lấy element của form cần validate
//     var formElement = document.querySelector(options.form);

//     if (formElement) {
//         // Khi submit form
//         formElement.onsubmit = function (e) {
//             e.preventDefault();

//             var isFormValid = true;
//             // Lặp qua từng rules và validate
//             options.rules.forEach(function (rule) {
//                 var inputElement = formElement.querySelector(rule.selector);
//                 var isValid = validate(inputElement, rule);
//                 if (!isValid) {
//                     isFormValid = false;
//                 }
//             })

//             if (isFormValid) {
//                 // Trường hợp submit với javascripts
//                 if (typeof options.onSubmit === 'function') {
//                     var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
//                     var formValues = Array.from(enableInputs).reduce(function (values, input) {
//                         switch (input.type) {
//                             case 'radio':
//                                 values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
//                                 break;
//                             case 'checkbox':
//                                 if (input.matches(':checked')) {
//                                     if (!Array.isArray(values[input.name])) {
//                                         values[input.name] = [];
//                                     }
//                                     values[input.name].push(input.value);
//                                 } else if (!values[input.name]) {
//                                     values[input.name] = '';
//                                 }
//                                 break;
//                             case 'file':
//                                 values[input.name] = input.files;
//                                 break;
//                             default:
//                                 values[input.name] = input.value;
//                         }
//                         return values;
//                     }, {})

//                     options.onSubmit({ formValues })
//                 }
//                 // Trường hợp submit với hành vi mặc định
//                 else {
//                     formElement.submit()
//                 }
//             }
//         }

//         // Lặp qua mỗi rule và xử lý ( lắng nghe sự kiện blur, input, ...)
//         options.rules.forEach(function (rule) {
//             // Lưu lại các rules cho mỗi input 
//             if (Array.isArray(selectorRules[rule.selector])) {
//                 selectorRules[rule.selector].push(rule.test)
//             } else {
//                 selectorRules[rule.selector] = [rule.test]
//             }

//             var inputElement = formElement.querySelectorAll(rule.selector);

//             Array.from(inputElement).forEach(function (inputElement) {
//                 // Xử lý trường hợp blur khỏi input
//                 inputElement.onblur = function () {
//                     validate(inputElement, rule);
//                 }

//                 // Xử lý mỗi khi người dùng nhập vào input
//                 inputElement.oninput = function () {
//                     var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
//                     errorElement.innerHTML = '';
//                     getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
//                 }
//             });
//         })
//     }
// }

// // Định nghĩa rules
// // Nguyên tắc của các rules:
// // 1. Khi có lỗi => Trả ra message lỗi
// // 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
// Validator.isRequired = function (selector, message) {
//     return {
//         selector: selector,
//         test: function (value) {
//             return value ? undefined : message || 'Vui lòng nhập trường này'
//         }
//     };
// };

// Validator.isEmail = function (selector, message) {
//     return {
//         selector: selector,
//         test: function (value) {
//             var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//             return regex.test(value) ? undefined : message || 'Trường này phải là email';
//         }
//     };
// };

// Validator.minLength = function (selector, min, message) {
//     return {
//         selector: selector,
//         test: function (value) {
//             return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
//         }
//     };
// };

// Validator.isConfirmed = function (selector, getConfirmValue, message) {
//     return {
//         selector: selector,
//         test: function (value) {
//             return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
//         }
//     };
// };

function Validator(formSelector) {
    var _this = this;
    var formRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    /**
     * Quy ước tạo rule:
     * - Nếu có lỗi thì return `error message`
     * - Nếu không có lỗi thì return `undefined`
     */
    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng email';
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min}`;
            };
        },
        max: function (max) {
            return function (value) {
                return value.length <= max ? undefined : `Vui lòng nhập ít nhất ${max}`;
            };
        }
    };

    // Lấy ra form element trong DOM theo `formSelector`
    var formElement = document.querySelector(formSelector);

    // Chỉ xử lý khi có element trong DOM theo `formElement
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');

                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];
                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // Lắng nghe sự kiện để validate (blur, change, ...)
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        // Hàm thực hiện validate
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;

            for(var rule of rules) {
                errorMessage = rule(event.target.value);
                if(errorMessage) {
                    break;
                }
            }

            // Nếu có lỗi thì hiển thị lỗi
            if (errorMessage) {
                var formGroup = getParent(event.target, '.form-group');
                if (formGroup) {
                    formGroup.classList.add('invalid')
                    var formMessage = formGroup.querySelector('.form-message');
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }

            return !errorMessage;
        }

        // Hàm clear message lỗi
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid')
                var formMessage = formGroup.querySelector('.form-message');
                if (formMessage) {
                    formMessage.innerText = '';
                }

            }
        }
    }

    // Xử lý hành vi submit form
    formElement.onsubmit = function (event) {
        event.preventDefault();

        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;

        for (var input of inputs) {
            if (!handleValidate({ target: input })) {
                isValid = false;
            }

        }
        // Khi không có lỗi thì submit form
        if (isValid) {
            if (typeof _this.onSubmit === 'function') {
                var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                var formValues = Array.from(enableInputs).reduce(function (values, input) {
                    switch (input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            if (input.matches(':checked')) {
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                            } else if (!values[input.name]) {
                                values[input.name] = '';
                            }
                            break;
                        case 'file':
                            values[input.name] = input.files;
                            break;
                        default:
                            values[input.name] = input.value;
                    }
                    return values;
                }, {});

                // Gọi lại hàm onSubmit và trả về kèm giá trị của form
                _this.onSubmit(formValues)
            } else {
                formElement.submit();
            }
        }
    }
}