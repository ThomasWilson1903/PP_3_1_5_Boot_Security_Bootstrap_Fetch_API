package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
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
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private UserServices userServices;
    private PasswordEncoder customPasswordEncoder;
    private RoleRepositories roleRepositories;

    private UserRepositories userRepositories;

    @Autowired
    public AdminController(UserServices userServices,
                           PasswordEncoder customPasswordEncoder,
                           RoleRepositories roleRepositories,
                           UserRepositories userRepositories) {
        this.userServices = userServices;
        this.customPasswordEncoder = customPasswordEncoder;
        this.roleRepositories = roleRepositories;
        this.userRepositories = userRepositories;
    }


    @GetMapping("/users")
    public String show(Model model, Principal principal) {
        model.addAttribute("users", userServices.getAllUsers());
        model.addAttribute("userEnter", userRepositories.findByUsername(principal.getName()));
        return "admin/adminPage";
    }

    //profile
    @GetMapping("/profile")
    public String showUserProfile(Model model, Principal principal) {
        model.addAttribute("users", userServices.getAllUsers());
        model.addAttribute("userEnter", userRepositories.findByUsername(principal.getName()));
        return "user/userPage";
    }

    @GetMapping("/new")
    public String newUser(Model model, Principal principal) {
        model.addAttribute("newUser", new User());
        List<Role> roles = roleRepositories.findAll();
        model.addAttribute("allRoles", roles);
        model.addAttribute("userEnter", userRepositories.findByUsername(principal.getName()));

        return "admin/newUser";
    }

    @GetMapping("/save")
    public String saveUser(@ModelAttribute("user") @Valid User user, BindingResult bindingResult,
                           Principal principal, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("newUser", user);
            List<Role> roles = roleRepositories.findAll();
            model.addAttribute("allRoles", roles);
            model.addAttribute("errors", bindingResult.getFieldErrors());
            model.addAttribute("userEnter", userRepositories.findByUsername(principal.getName()));
            return "admin/newUser";
        }
        user.setPassword(customPasswordEncoder.encode(user.getPassword()));
        userServices.saveUser(user);


        return "redirect:/admin/users";
    }

    @GetMapping("/edit")
    public String editUser(@ModelAttribute("id") int userId, Model model) {
        model.addAttribute("newUser", userServices.getUser(userId));

        List<Role> roles = roleRepositories.findAll();
        model.addAttribute("allRoles", roles);
        return "newUser";
    }

    @GetMapping("/del")
    public String del(@RequestParam("id") int id) {
        userServices.deleteUser(id);
        return "redirect:/admin/users";
    }
}


