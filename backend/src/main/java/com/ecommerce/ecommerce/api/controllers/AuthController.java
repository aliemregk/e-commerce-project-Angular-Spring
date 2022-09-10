package com.ecommerce.ecommerce.api.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.ecommerce.business.abstracts.AuthService;
import com.ecommerce.ecommerce.core.entities.User;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.entities.dtos.UserForLoginDto;
import com.ecommerce.ecommerce.entities.dtos.UserForRegisterDto;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody @Valid UserForLoginDto userForLoginDto) {

        DataResult<User> result = this.authService.login(userForLoginDto);
        if (!result.isSucceed()) {
            return ResponseEntity.badRequest().body(result.getMessage());
        }

        DataResult<String> tokenResult = this.authService.createAccessToken(result.getData());
        if (tokenResult.isSucceed()) {
            return ResponseEntity.ok(tokenResult);
        }
        return ResponseEntity.badRequest().body(tokenResult);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserForRegisterDto userForRegisterDto) {

        Result userExists = this.authService.userExists(userForRegisterDto.getEmail());
        if (userExists.isSucceed()) {
            return ResponseEntity.badRequest().body(userExists.getMessage());
        }

        DataResult<User> registerResult = this.authService.register(userForRegisterDto);
        DataResult<String> tokenResult = this.authService.createAccessToken(registerResult.getData());
        if (tokenResult.isSucceed()) {
            return ResponseEntity.ok(tokenResult.getData());
        }
        return ResponseEntity.badRequest().body(tokenResult.getMessage());
    }

}
