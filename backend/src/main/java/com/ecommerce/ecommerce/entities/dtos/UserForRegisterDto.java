package com.ecommerce.ecommerce.entities.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserForRegisterDto {

    private int id;
    @NotNull
    @NotBlank
    @Length(min = 2, max = 20)
    private String firstName;
    @NotNull
    @NotBlank
    @Length(min = 2, max = 20)
    private String lastName;
    @NotNull
    @NotBlank
    private String address;
    @NotNull
    @NotBlank
    private String phone;
    @NotNull
    @NotBlank
    @Email
    private String email;
    @NotNull
    @NotBlank
    @Length(min = 6)
    private String password;
}
