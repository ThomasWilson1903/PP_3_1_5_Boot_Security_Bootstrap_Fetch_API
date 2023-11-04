package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.UserServices;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserServices userServices;
    @GetMapping("/profile")
    public String showId() {
        return "profileUser";
    }

}
