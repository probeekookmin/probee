package com.capstone.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.server.model.MissingPeopleEntity;
import com.capstone.server.model.UserEntity;
import com.capstone.server.response.SuccessResponse;
import com.capstone.server.service.MissingPeopleService;

@RestController
@RequestMapping("/api/missing-people")
public class MissingPeopleController {

    @Autowired
    private MissingPeopleService missingPeopleService;
    
    @GetMapping()
    public ResponseEntity<?> getUsers() {
        List<MissingPeopleEntity> missingPeopleEntities = missingPeopleService.getAllMissingPeople();
        return ResponseEntity.ok().body(new SuccessResponse(missingPeopleEntities));
    }

    // @PostMapping()
    // public ResponseEntity<?> createUser(@Validated @RequestBody UserCreateRequestDto userCreateRequestDto, BindingResult bindingResult) {
    //     if (bindingResult.hasErrors()) {
    //         Map<String, String> errorMap = new HashMap<>();
    //         for (FieldError error : bindingResult.getFieldErrors()) {
    //             errorMap.put(error.getField(), error.getDefaultMessage());
    //         }
    //         throw new UserException(UserErrorCode.BAD_REQUEST, errorMap);
    //     } else {
    //         return ResponseEntity.ok().body(new SuccessResponse(userService.createUser(userCreateRequestDto.toEntity())));
    //     }
    // }

}