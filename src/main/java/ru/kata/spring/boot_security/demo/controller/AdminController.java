package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.UserServices;

import javax.validation.Valid;

@Controller
@RequestMapping("/admin")
public class AdminController {

    UserServices userServices;
    private PasswordEncoder customPasswordEncoder;

    @Autowired
    public AdminController(UserServices userServices, PasswordEncoder customPasswordEncoder) {
        this.userServices = userServices;
        this.customPasswordEncoder = customPasswordEncoder;
    }

    @GetMapping("/{id}")
    public User showId(@PathVariable("id") int id) {
        return userServices.getUser(id);
    }

    @GetMapping("/users")
    public String show(Model model) {
        model.addAttribute("user", userServices.getAllUsers());
        return "users";
    }

    @GetMapping("/new")
    public String newUser(Model model) {
        model.addAttribute("newUser", new User());
        return "newUser";
    }

    @GetMapping("/save")
    public String saveUser(@Valid User user, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("newUser", user);
            model.addAttribute("errors", bindingResult.getFieldErrors());
            return "newUser";
        }
        user.setPassword(customPasswordEncoder.encode(user.getPassword()));
        userServices.saveUser(user);

        return "redirect:/admin/users";
    }
    @GetMapping("/edit")
    public String editUser(@ModelAttribute("id") int userId, Model model) {
        model.addAttribute("newUser", userServices.getUser(userId));
        return "newUser";
    }

    @GetMapping("/del")
    public String del(@RequestParam("id") int id) {
        userServices.deleteUser(id);
        return "redirect:/admin/users";
    }
}
