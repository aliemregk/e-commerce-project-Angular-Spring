package com.ecommerce.ecommerce.dataAccess.abstracts;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.ecommerce.entities.concretes.Product;

public interface ProductDao extends JpaRepository<Product, Integer> {

    List<Product> getAllByMaterialOrderByIdAsc(String material);

    List<Product> getAllByCategoryIdOrderByIdAsc(int categoryId);

    List<Product> findByUnitPriceBetweenOrderByIdAsc(double min, double max);
}
