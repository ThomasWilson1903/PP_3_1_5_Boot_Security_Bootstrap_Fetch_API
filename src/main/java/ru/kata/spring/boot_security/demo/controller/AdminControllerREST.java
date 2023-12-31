package ru.kata.spring.boot_security.demo.controller;

import org.hibernate.mapping.Any;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepositories;
import ru.kata.spring.boot_security.demo.repositories.UserRepositories;
import ru.kata.spring.boot_security.demo.services.UserServices;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/rest")
public class AdminControllerREST {
    private UserServices userServices;
    private PasswordEncoder customPasswordEncoder;
    private RoleRepositories roleRepositories;

    private UserRepositories userRepositories;

    @Autowired
    public AdminControllerREST(UserServices userServices, PasswordEncoder customPasswordEncoder, RoleRepositories roleRepositories, UserRepositories userRepositories) {
        this.userServices = userServices;
        this.customPasswordEncoder = customPasswordEncoder;
        this.roleRepositories = roleRepositories;
        this.userRepositories = userRepositories;
    }

    @GetMapping("/users/{id}")
    public User showId(@PathVariable("id") int id) {
        return userServices.getUser(id);
    }


    @GetMapping("/users")
    public List<User> show() {
        return userRepositories.findAll();
    }

    @GetMapping("/roles")
    public List<Role> showRoles() {
        return roleRepositories.findAll();
    }

    @GetMapping("/profile")
    public User getUserAuthorization(Principal principal) {
        return userRepositories.findByUsername(principal.getName());
    }

    @PostMapping("/save")
    public User saveNewUser(@RequestBody User user) {
        user.setPassword(customPasswordEncoder.encode(user.getPassword()));
        List<Role> roles = new ArrayList<>();
        for (Role role : user.getRoles()) {
            roles.add(roleRepositories.findById(role.getId()).orElse(null));
        }
        user.setRoles(roles);
        userServices.saveUser(user);
        return userRepositories.findByUsername(user.getUsername());
    }


    @PutMapping(value = "/edit/{id}")
    public User updateUser(@RequestBody User user, BindingResult bindingResult) {
        if (!bindingResult.hasErrors()) {
            List<Role> roles = new ArrayList<>();
            for (Role role : user.getRoles()) {
                roles.add(roleRepositories.findById(role.getId()).orElse(null));
            }
            user.setRoles(roles);
            userServices.saveUser(user);
        }
        return user;
    }

    @DeleteMapping("/del/{id}")
    public String del(@PathVariable("id") int id) {
        userServices.deleteUser(id);
        return "del user " + id;
    }
}
