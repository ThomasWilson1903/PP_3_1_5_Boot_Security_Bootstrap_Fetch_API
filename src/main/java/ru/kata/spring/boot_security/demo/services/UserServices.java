package ru.kata.spring.boot_security.demo.services;


import ru.kata.spring.boot_security.demo.model.User;
import java.util.List;

public interface UserServices {
    List<User> getAllUsers();
    User getUser(int id);
    void saveUser(User user);
    void deleteUser(int id);
}
