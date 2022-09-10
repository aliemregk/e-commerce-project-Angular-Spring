package com.ecommerce.ecommerce.business.concretes;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.ecommerce.business.abstracts.AuthService;
import com.ecommerce.ecommerce.business.abstracts.UserService;
import com.ecommerce.ecommerce.business.constants.Messages;
import com.ecommerce.ecommerce.core.entities.User;
import com.ecommerce.ecommerce.core.utilities.results.ErrorResult;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.SuccessResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.ErrorDataResult;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.SuccessDataResult;
import com.ecommerce.ecommerce.core.utilities.security.hashing.HashingHelper;
import com.ecommerce.ecommerce.core.utilities.security.jwt.config.JwtTokenHelper;
import com.ecommerce.ecommerce.entities.dtos.UserForLoginDto;
import com.ecommerce.ecommerce.entities.dtos.UserForRegisterDto;

@Service
public class AuthManager implements AuthService {

    private UserService userService;
    private ModelMapper modelMapper;
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    public AuthManager(UserService userService, ModelMapper modelMapper, JwtTokenHelper jwtTokenHelper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.jwtTokenHelper = jwtTokenHelper;
    }

    private String message = " user.";

    @Override
    public DataResult<User> register(UserForRegisterDto userForRegisterDto) {

        if (userForRegisterDto != null) {
            userForRegisterDto.setPassword(HashingHelper.createPassword(userForRegisterDto.getPassword()));
            User userToAdd = this.modelMapper.map(userForRegisterDto, User.class);
            return this.userService.add(userToAdd);
        }
        return new ErrorDataResult<>(Messages.CANT_ADD + this.message);
    }

    @Override
    public DataResult<User> login(UserForLoginDto userForLoginDto) {

        User userToCheck = this.userService.getByEmail(userForLoginDto.getEmail()).getData();

        if (userToCheck == null) {
            return new ErrorDataResult<>(Messages.CANT_FIND + this.message);
        }
        if (!HashingHelper.verifyPassword(userForLoginDto.getPassword(), userToCheck.getPassword())) {
            return new ErrorDataResult<>(Messages.WRONG_PASSWORD);
        }
        return new SuccessDataResult<>(userToCheck, Messages.LOGGED);
    }

    @Override
    public Result userExists(String email) {
        if (this.userService.getByEmail(email) != null) {
            return new ErrorResult(Messages.USER_EXISTS);
        }
        return new SuccessResult();
    }

    @Override
    public DataResult<String> createAccessToken(User user) {

        String accessToken = this.jwtTokenHelper.createToken(user);
        return new SuccessDataResult<String>(accessToken, Messages.TOKEN_CREATED);
    }

}
