package ru.kata.spring.boot_security.demo.dao;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private EntityManager entityManagers;

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
    @Transactional
    public void saveUser(User user) {
        Session session = entityManagers.unwrap(Session.class);
        session.merge(user);
        session.flush();
    }

    @Transactional
    @Override
    public void deleteUser(int id) {
        Session session = entityManagers.unwrap(Session.class);
        session.remove(entityManagers.find(User.class, id));
    }
}
