package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepositories;
import ru.kata.spring.boot_security.demo.services.UserServices;

@RestController
@RequestMapping("/admin")
public class AdminControllerREST {
    private UserServices userServices;
    private PasswordEncoder customPasswordEncoder;
    private RoleRepositories roleRepositories;

    @Autowired
    public AdminControllerREST(UserServices userServices, PasswordEncoder customPasswordEncoder, RoleRepositories roleRepositories) {
        this.userServices = userServices;
        this.customPasswordEncoder = customPasswordEncoder;
        this.roleRepositories = roleRepositories;
    }

    @GetMapping("/{id}")
    public User showId(@PathVariable("id") int id) {
        return userServices.getUser(id);
    }
}
