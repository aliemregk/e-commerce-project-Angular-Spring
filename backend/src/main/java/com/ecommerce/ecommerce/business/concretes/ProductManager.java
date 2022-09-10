package com.ecommerce.ecommerce.business.concretes;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ecommerce.ecommerce.business.abstracts.ProductService;
import com.ecommerce.ecommerce.business.constants.Messages;
import com.ecommerce.ecommerce.core.utilities.results.ErrorResult;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.SuccessResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.ErrorDataResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.SuccessDataResult;
import com.ecommerce.ecommerce.dataAccess.abstracts.ProductDao;
import com.ecommerce.ecommerce.entities.concretes.Product;

@Service
public class ProductManager implements ProductService {

    private ProductDao productDao;
    private String message = "Product(s) ";

    @Autowired
    public ProductManager(ProductDao productDao) {
        this.productDao = productDao;
    }

    @Override
    public DataResult<List<Product>> getAll() {
        return new SuccessDataResult<>(this.productDao.findAll(Sort.by(Sort.Direction.ASC, "id")),
                this.message + Messages.LISTED);
    }

    @Override
    public DataResult<List<Product>> getAllByMaterial(String material) {
        return new SuccessDataResult<>(this.productDao.getAllByMaterialOrderByIdAsc(material),
                this.message + Messages.LISTED);
    }

    @Override
    public DataResult<List<Product>> getAllByCategoryId(int categoryId) {
        return new SuccessDataResult<>(this.productDao.getAllByCategoryIdOrderByIdAsc(categoryId),
                this.message + Messages.LISTED);
    }

    @Override
    public DataResult<Product> getById(int id) {
        Optional<Product> result = this.productDao.findById(id);
        if (result.isPresent()) {
            return new SuccessDataResult<>(result.get(), this.message + Messages.LISTED);
        }
        return new ErrorDataResult<>(Messages.CANT_GET + this.message.toLowerCase());
    }

    @Override
    public DataResult<List<Product>> findByUnitPriceBetween(double min, double max) {
        return new SuccessDataResult<>(this.productDao.findByUnitPriceBetweenOrderByIdAsc(min, max),
                this.message + Messages.LISTED);
    }

    @Override
    public DataResult<Product> add(Product product) {
        return new SuccessDataResult<>(this.productDao.save(product), product.getName() + Messages.ADDED);
    }

    @Override
    public DataResult<Product> update(Product product) {
        return new SuccessDataResult<>(this.productDao.save(product), product.getName() + Messages.UPDATED);
    }

    @Override
    public Result delete(int id) {
        Optional<Product> result = this.productDao.findById(id);
        if (result.isPresent()) {
            this.productDao.delete(result.get());
            return new SuccessResult(result.get().getName() + Messages.DELETED);
        }
        return new ErrorResult(Messages.CANT_FIND + this.message.toLowerCase());

    }

}