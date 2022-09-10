package com.ecommerce.ecommerce.entities.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhotoDto {

    private int id;
    @NotNull
    @NotBlank
    private String url;
    @NotNull
    private int productId;
}
