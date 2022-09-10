package com.ecommerce.ecommerce.entities.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {

    private int id;
    @NotNull
    @NotBlank
    @Length(min = 2, max = 20)
    private String name;
    @NotNull
    @NotBlank
    private String photoUrl;
}
