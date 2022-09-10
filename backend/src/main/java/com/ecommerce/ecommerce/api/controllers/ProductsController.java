package com.ecommerce.ecommerce.api.controllers;

import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.ecommerce.business.abstracts.ProductService;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.entities.concretes.Product;
import com.ecommerce.ecommerce.entities.dtos.ProductDto;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductsController {

    private ProductService productService;
    private ModelMapper modelMapper;

    @Autowired
    public ProductsController(ProductService productService, ModelMapper mapper) {
        this.productService = productService;
        this.modelMapper = mapper;
    }

    @GetMapping("/getAll")
    public DataResult<List<Product>> getAll() {
        return this.productService.getAll();
    }

    @GetMapping("/getAllByMaterial")
    public DataResult<List<Product>> getAllByMaterial(String material) {
        return this.productService.getAllByMaterial(material);
    }

    @GetMapping("/getAllByCategoryId")
    public DataResult<List<Product>> getAllByCategoryId(int categoryId) {
        return this.productService.getAllByCategoryId(categoryId);
    }

    @GetMapping("/getById")
    public DataResult<Product> getById(int id) {
        return this.productService.getById(id);
    }

    @GetMapping("/findByUnitPriceBetween")
    public DataResult<List<Product>> findByUnitPriceBetween(double min, double max) {
        return this.productService.findByUnitPriceBetween(min, max);
    }

    @PostMapping("/add")
    public DataResult<Product> add(@RequestBody @Valid ProductDto productDto) {
        Product productToAdd = this.modelMapper.map(productDto, Product.class);
        return this.productService.add(productToAdd);
    }

    @PostMapping("/update")
    public DataResult<Product> update(@RequestBody @Valid ProductDto productDto) {
        Product productToUpdate = this.modelMapper.map(productDto, Product.class);
        return this.productService.update(productToUpdate);
    }

    @PostMapping("/delete")
    public Result delete(int id) {
        return this.productService.delete(id);
    }
}
