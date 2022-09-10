package com.ecommerce.ecommerce.business.concretes;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ecommerce.ecommerce.business.abstracts.PhotoService;
import com.ecommerce.ecommerce.business.constants.Constants;
import com.ecommerce.ecommerce.business.constants.Messages;
import com.ecommerce.ecommerce.core.utilities.business.BusinessRules;
import com.ecommerce.ecommerce.core.utilities.results.ErrorResult;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.SuccessResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.ErrorDataResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.SuccessDataResult;
import com.ecommerce.ecommerce.dataAccess.abstracts.PhotoDao;
import com.ecommerce.ecommerce.entities.concretes.Photo;

@Service
public class PhotoManager implements PhotoService {

    private PhotoDao photoDao;
    private String message = "Photo ";

    @Autowired
    public PhotoManager(PhotoDao photoDao) {
        this.photoDao = photoDao;
    }

    @Override
    public DataResult<List<Photo>> getAll() {
        return new SuccessDataResult<>(this.photoDao.findAll(Sort.by(Sort.Direction.ASC, "id")),
                this.message + Messages.LISTED);
    }

    @Override
    public DataResult<List<Photo>> getAllByProductId(int id) {
        return new SuccessDataResult<>(this.photoDao.getAllByProductId(id), this.message + Messages.LISTED);
    }

    @Override
    public DataResult<Photo> getById(int id) {
        Optional<Photo> result = this.photoDao.findById(id);
        if (result.isPresent()) {
            return new SuccessDataResult<>(result.get(), this.message + Messages.LISTED);
        }
        return new ErrorDataResult<>(Messages.CANT_GET + this.message.toLowerCase());
    }

    @Override
    public DataResult<Photo> add(Photo photo) {

        DataResult result = BusinessRules.Run(checkNumberOfImages(photo.getProductId()));

        if (result == null) {
            return new SuccessDataResult<>(this.photoDao.save(photo), this.message + Messages.ADDED);
        }
        return result;
    }

    @Override
    public DataResult<Photo> update(Photo photo) {
        return new SuccessDataResult<>(this.photoDao.save(photo), this.message + Messages.UPDATED);
    }

    @Override
    public Result delete(int id) {
        Optional<Photo> result = this.photoDao.findById(id);
        if (result.isPresent()) {
            this.photoDao.delete(result.get());
            return new SuccessResult(this.message + Messages.DELETED);
        }
        return new ErrorResult(Messages.CANT_FIND + this.message.toLowerCase());
    }

    private DataResult<?> checkNumberOfImages(int productId) {
        int numberOfImages = this.photoDao.getAllByProductId(productId).size();

        if (numberOfImages < Constants.NUMBER_OF_IMAGES) {
            return new SuccessDataResult<>();
        }
        return new ErrorDataResult<>(Messages.IMAGE_NUMBER_EXCEED);
    }
}
