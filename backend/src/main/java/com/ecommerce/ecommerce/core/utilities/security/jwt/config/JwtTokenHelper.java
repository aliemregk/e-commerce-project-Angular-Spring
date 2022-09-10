package com.ecommerce.ecommerce.core.utilities.security.jwt.config;

import com.ecommerce.ecommerce.core.entities.User;

public interface JwtTokenHelper {

    String createToken(User user);

}
