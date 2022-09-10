package com.ecommerce.ecommerce.business.concretes;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ecommerce.ecommerce.business.abstracts.CategoryService;
import com.ecommerce.ecommerce.business.constants.Messages;
import com.ecommerce.ecommerce.core.utilities.results.ErrorResult;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.SuccessResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.ErrorDataResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.SuccessDataResult;
import com.ecommerce.ecommerce.dataAccess.abstracts.CategoryDao;
import com.ecommerce.ecommerce.entities.concretes.Category;

@Service
public class CategoryManager implements CategoryService {

    private CategoryDao categoryDao;
    private String message = "Category(s)";

    @Autowired
    public CategoryManager(CategoryDao categoryDao) {
        this.categoryDao = categoryDao;
    }

    @Override
    public DataResult<List<Category>> getAll() {
        return new SuccessDataResult<List<Category>>(this.categoryDao.findAll(Sort.by(Sort.Direction.ASC, "id")),
                this.message + Messages.LISTED);
    }

    @Override
    public DataResult<Category> getById(int id) {

        Optional<Category> result = this.categoryDao.findById(id);
        if (result.isPresent()) {
            return new SuccessDataResult<>(result.get(), this.message + Messages.LISTED);
        }
        return new ErrorDataResult<>(Messages.CANT_GET + this.message.toLowerCase());
    }

    @Override
    public DataResult<Category> getByName(String name) {
        return new SuccessDataResult<>(this.categoryDao.getByName(name), this.message + Messages.LISTED);
    }

    @Override
    public DataResult<Category> add(Category category) {
        return new SuccessDataResult<>(this.categoryDao.save(category), category.getName() + Messages.ADDED);
    }

    @Override
    public DataResult<Category> update(Category category) {
        return new SuccessDataResult<>(this.categoryDao.save(category), category.getName() + Messages.UPDATED);
    }

    @Override
    public Result delete(int id) {
        Optional<Category> result = this.categoryDao.findById(id);
        if (result.isPresent()) {
            this.categoryDao.delete(result.get());
            return new SuccessResult(result.get().getName() + Messages.DELETED);
        }
        return new ErrorResult(Messages.CANT_FIND + this.message.toLowerCase());
    }

}
