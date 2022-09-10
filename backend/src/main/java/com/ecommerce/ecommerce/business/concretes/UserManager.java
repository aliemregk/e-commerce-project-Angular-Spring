package com.ecommerce.ecommerce.business.concretes;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ecommerce.ecommerce.business.abstracts.UserService;
import com.ecommerce.ecommerce.business.constants.Messages;
import com.ecommerce.ecommerce.core.dataAccess.UserDao;
import com.ecommerce.ecommerce.core.entities.User;
import com.ecommerce.ecommerce.core.utilities.results.ErrorResult;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.SuccessResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.ErrorDataResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.SuccessDataResult;

@Service
public class UserManager implements UserService {

    private UserDao userDao;
    private String message = "User(s)";

    @Autowired
    public UserManager(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public DataResult<List<User>> getAll() {
        return new SuccessDataResult<>(this.userDao.findAll(Sort.by(Sort.Direction.ASC, "id")),
                this.message + Messages.LISTED);
    }

    @Override
    public DataResult<User> getById(int id) {
        Optional<User> result = this.userDao.findById(id);
        if (result.isPresent()) {
            return new SuccessDataResult<>(result.get(), this.message + Messages.LISTED);
        }
        return new ErrorDataResult<>(Messages.CANT_GET + this.message.toLowerCase());
    }

    @Override
    public DataResult<User> getByEmail(String email) {
        return new SuccessDataResult<>(this.userDao.getByEmail(email), this.message + Messages.LISTED);
    }

    @Override
    public DataResult<User> add(User user) {
        return new SuccessDataResult<>(this.userDao.save(user), user.getEmail() + Messages.ADDED);
    }

    @Override
    public DataResult<User> update(User user) {
        return new SuccessDataResult<>(this.userDao.save(user), user.getEmail() + Messages.UPDATED);
    }

    @Override
    public Result delete(int id) {
        Optional<User> result = this.userDao.findById(id);
        if (result.isPresent()) {
            this.userDao.delete(result.get());
            return new SuccessResult(result.get().getEmail() + Messages.DELETED);
        }
        return new ErrorResult(Messages.CANT_FIND + this.message.toLowerCase());
    }

}
