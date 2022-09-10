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

import com.ecommerce.ecommerce.business.abstracts.CategoryService;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.entities.concretes.Category;
import com.ecommerce.ecommerce.entities.dtos.CategoryDto;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoriesController {

    private CategoryService categoryService;
    private ModelMapper modelMapper;

    @Autowired
    public CategoriesController(CategoryService categoryService, ModelMapper modelMapper) {
        this.categoryService = categoryService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/getAll")
    public DataResult<List<Category>> getAll() {
        return this.categoryService.getAll();
    }

    @GetMapping("/getById")
    public DataResult<Category> getById(int id) {
        return this.categoryService.getById(id);
    }

    @GetMapping("/getByName")
    public DataResult<Category> getByName(String name) {
        return this.categoryService.getByName(name);
    }

    @PostMapping("/add")
    public DataResult<Category> add(@RequestBody @Valid CategoryDto categoryDto) {
        Category categoryToAdd = this.modelMapper.map(categoryDto, Category.class);
        return this.categoryService.add(categoryToAdd);
    }

    @PostMapping("/update")
    public DataResult<Category> update(@RequestBody @Valid CategoryDto categoryDto) {
        Category categoryToUpdate = this.modelMapper.map(categoryDto, Category.class);
        return this.categoryService.update(categoryToUpdate);
    }

    @PostMapping("/delete")
    public Result delete(int id) {
        return this.categoryService.delete(id);
    }
}
