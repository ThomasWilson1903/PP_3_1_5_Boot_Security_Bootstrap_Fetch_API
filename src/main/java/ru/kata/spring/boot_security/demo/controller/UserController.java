package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepositories;
import ru.kata.spring.boot_security.demo.services.UserServices;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/user")
public class UserController {

    UserServices userServices;
    UserRepositories userRepositories;

    @Autowired
    public UserController(UserServices userServices, UserRepositories userRepositories) {
        this.userServices = userServices;
        this.userRepositories = userRepositories;
    }

    @GetMapping("/profile")
    public String showId(Principal principal, Model model) {
        model.addAttribute("users", userServices.getAllUsers());
        model.addAttribute("userEnter", userRepositories.findByUsername(principal.getName()));
        return "user/userPage";
    }


}
