package com.ecommerce.ecommerce.business.abstracts;

import java.util.List;

import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.entities.concretes.Product;

public interface ProductService {

    DataResult<List<Product>> getAll();

    DataResult<List<Product>> getAllByMaterial(String material);

    DataResult<List<Product>> getAllByCategoryId(int categoryId);

    DataResult<Product> getById(int id);


    DataResult<List<Product>> findByUnitPriceBetween(double min, double max);

    DataResult<Product> add(Product product);

    DataResult<Product> update(Product product);

    Result delete(int id);
}
