package ru.kata.spring.boot_security.demo.dao;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@Transactional
public class RoleDaoImpl implements RoleDao{

    EntityManager entityManagers;

    @Autowired
    public RoleDaoImpl(EntityManager entityManagers) {
        this.entityManagers = entityManagers;
    }

    @Override
    public List<Role> getAllUsers() {
        Session session = entityManagers.unwrap(Session.class);
        return session.createQuery("from Role ", Role.class).getResultList();
    }

    @Override
    public Role getUser(int id) {
        return null;

    }

    @Override
    public void saveRole(Role role) {
        Session session = entityManagers.unwrap(Session.class);
        session.merge(role);
        session.flush();
    }

    @Override
    public void deleteUser(int id) {

    }
}
