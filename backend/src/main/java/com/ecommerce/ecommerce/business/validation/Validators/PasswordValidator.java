package com.ecommerce.ecommerce.business.validation.Validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.ecommerce.ecommerce.business.validation.Constraints.PasswordConstraint;

public class PasswordValidator implements ConstraintValidator<PasswordConstraint, String> {

    private static final int PASSWORD_LENGTH = 6;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value != null && (value.length() > PASSWORD_LENGTH);
    }

}
