package com.ecommerce.ecommerce.entities.dtos;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

    private int id;

    @NotNull
    @NotBlank
    @Length(min = 2, max = 20)
    private String name;

    @NotNull
    @NotBlank
    private String description;

    @NotNull
    @NotBlank
    private String material;

    @NotNull
    @Min(1)
    private double unitPrice;

    @NotNull
    @Min(1)
    private int unitsInStock;

    @NotNull
    @NotBlank
    private String coverImgUrl;

    @NotNull
    @Min(0)
    @Max(99)
    private double discount;

    @NotNull
    private int categoryId;

}
