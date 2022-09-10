package com.ecommerce.ecommerce.business.abstracts;

import com.ecommerce.ecommerce.core.entities.User;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.entities.dtos.UserForLoginDto;
import com.ecommerce.ecommerce.entities.dtos.UserForRegisterDto;

public interface AuthService {

    DataResult<User> register(UserForRegisterDto userForRegisterDto);

    DataResult<User> login(UserForLoginDto userForLoginDto);

    Result userExists(String email);

    DataResult<String> createAccessToken(User user);
}
