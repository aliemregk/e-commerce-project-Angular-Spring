package com.ecommerce.ecommerce.business.abstracts;

import java.util.List;

import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.entities.concretes.Category;

public interface CategoryService {

    DataResult<List<Category>> getAll();

    DataResult<Category> getById(int id);

    DataResult<Category> getByName(String name);

    DataResult<Category> add(Category category);

    DataResult<Category> update(Category category);

    Result delete(int id);
}
