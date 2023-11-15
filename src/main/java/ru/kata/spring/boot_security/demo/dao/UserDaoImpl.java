package ru.kata.spring.boot_security.demo.dao;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepositories;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@Transactional
public class UserDaoImpl implements UserDao {
    private EntityManager entityManagers;

    UserRepositories userRepositories;

    @Autowired
    public UserDaoImpl(EntityManager entityManagers, UserRepositories userRepositories) {
        this.entityManagers = entityManagers;
        this.userRepositories = userRepositories;
    }

    @Override
    public List<User> getAllUsers() {
        Session session = entityManagers.unwrap(Session.class);
        return session.createQuery("from User", User.class).getResultList();
    }

    @Override
    public User getUser(int id) {
        Session session = entityManagers.unwrap(Session.class);
        return session.find(User.class, id);
    }

    @Override
    public void saveUser(User user) {
        Session session = entityManagers.unwrap(Session.class);
        session.merge(user);
        session.flush();
    }

    @Override
    public void deleteUser(int id) {
        userRepositories.delete(new User(id));
    }
}
