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

import com.ecommerce.ecommerce.business.abstracts.PhotoService;
import com.ecommerce.ecommerce.core.utilities.results.Result;
import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;
import com.ecommerce.ecommerce.entities.concretes.Photo;
import com.ecommerce.ecommerce.entities.dtos.PhotoDto;

@RestController
@RequestMapping("/api/photos")
@CrossOrigin
public class PhotosController {

    private PhotoService photoService;
    private ModelMapper modelMapper;

    @Autowired
    public PhotosController(PhotoService photoService, ModelMapper modelMapper) {
        this.photoService = photoService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/getAll")
    public DataResult<List<Photo>> getAll() {
        return this.photoService.getAll();
    }

    @GetMapping("/getAllByProductId")
    public DataResult<List<Photo>> getAllByProductId(int id) {
        return this.photoService.getAllByProductId(id);
    }

    @GetMapping("/getById")
    public DataResult<Photo> getById(int id) {
        return this.photoService.getById(id);
    }

    @PostMapping("/add")
    public DataResult<Photo> add(@RequestBody @Valid PhotoDto photoDto) {
        Photo photoToAdd = this.modelMapper.map(photoDto, Photo.class);
        return this.photoService.add(photoToAdd);
    }

    @PostMapping("/update")
    public DataResult<Photo> update(@RequestBody @Valid PhotoDto photoDto) {
        Photo photoToUpdate = this.modelMapper.map(photoDto, Photo.class);
        return this.photoService.update(photoToUpdate);
    }

    @PostMapping("/delete")
    public Result delete(int id) {
        return this.photoService.delete(id);
    }
}
