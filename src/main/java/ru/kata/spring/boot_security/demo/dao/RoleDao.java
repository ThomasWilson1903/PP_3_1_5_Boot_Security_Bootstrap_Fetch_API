package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public interface RoleDao {
    List<Role> getAllUsers();

    Role getUser(int id);

    void saveRole(Role user);

    void deleteUser(int id);
}
