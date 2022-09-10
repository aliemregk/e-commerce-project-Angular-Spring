package com.ecommerce.ecommerce.business.abstracts;

import java.util.List;

import com.ecommerce.ecommerce.core.entities.User;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;

public interface UserService {

    DataResult<List<User>> getAll();

    DataResult<User> getById(int id);

    DataResult<User> getByEmail(String email);

    DataResult<User> add(User user);

    DataResult<User> update(User user);

    Result delete(int id);
}
