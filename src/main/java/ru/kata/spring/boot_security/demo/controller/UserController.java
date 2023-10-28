package ru.kata.spring.boot_security.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserController {

    @GetMapping("/")
    public String homePage(){
        return "home";
    }

    @GetMapping("/user")
    public String userPage(Principal principal){
        return "userPage" + principal.getName();
    }

}
