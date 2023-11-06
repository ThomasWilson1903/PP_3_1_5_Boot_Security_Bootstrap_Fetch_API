package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.UserServices;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserServices userServices;

    @GetMapping("/profile")
    public String showId(Principal principal, Model model) {
        List<User> users = userServices.getAllUsers();
        users.stream().filter(s -> s.getUsername().equals(principal.getName()))
                .collect(Collectors.toList());
        model.addAttribute("user", users.get(0));
        return "profileUser";
    }

}
