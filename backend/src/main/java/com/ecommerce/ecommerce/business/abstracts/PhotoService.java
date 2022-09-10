package com.ecommerce.ecommerce.business.abstracts;

import java.util.List;

import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.entities.concretes.Photo;

public interface PhotoService {

    DataResult<List<Photo>> getAll();

    DataResult<List<Photo>> getAllByProductId(int id);

    DataResult<Photo> getById(int id);

    DataResult<Photo> add(Photo photo);

    DataResult<Photo> update(Photo photo);

    Result delete(int id);
}
