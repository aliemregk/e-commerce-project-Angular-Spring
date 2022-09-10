package com.ecommerce.ecommerce.api.controllers;

import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.ecommerce.business.abstracts.UserService;
import com.ecommerce.ecommerce.core.dtos.UserDto;
import com.ecommerce.ecommerce.core.entities.User;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.core.utilities.security.hashing.HashingHelper;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UsersController {

    private UserService userService;
    private ModelMapper modelMapper;

    @Autowired
    public UsersController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/getAll")
    public DataResult<List<User>> getAll() {
        return this.userService.getAll();
    }

    @GetMapping("/getById")
    public DataResult<User> getById(int id) {
        return this.userService.getById(id);
    }

    @GetMapping("/getByEmail")
    public DataResult<User> getByEmail(String email) {
        return this.userService.getByEmail(email);
    }

    @PostMapping("/add")
    public DataResult<User> add(@RequestBody @Valid UserDto userDto) {
        userDto.setPasswordHash(HashingHelper.createPassword(userDto.getPasswordHash()));
        User userToAdd = this.modelMapper.map(userDto, User.class);
        return this.userService.add(userToAdd);
    }

    @PostMapping("/update")
    public DataResult<User> update(@RequestBody @Valid UserDto userDto) {
        User usertoUpdate = this.modelMapper.map(userDto, User.class);
        return this.userService.update(usertoUpdate);
    }

    @PostMapping("/delete")
    public Result delete(int id) {
        return this.userService.delete(id);
    }
}
